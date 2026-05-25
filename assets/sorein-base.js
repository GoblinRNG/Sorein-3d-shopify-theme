/**
 * Sorein Theme — Global Base JavaScript
 * Version: 1.0.0
 * Brand: Sorein — Premium Scandinavian Energy-Tech
 *
 * Global utilities: cart, toast, mobile menu, scroll lock, event bus, format money.
 * No external dependencies. Runs as IIFE, exposes window.SoreinTheme.
 */

(function () {
  'use strict';

  /* ============================================================
     EVENT BUS
     Simple custom event system for cross-component communication
     ============================================================ */

  const EventBus = {
    _listeners: {},

    on(event, callback) {
      if (!this._listeners[event]) {
        this._listeners[event] = [];
      }
      this._listeners[event].push(callback);
      return this;
    },

    off(event, callback) {
      if (!this._listeners[event]) return this;
      if (callback) {
        this._listeners[event] = this._listeners[event].filter(cb => cb !== callback);
      } else {
        delete this._listeners[event];
      }
      return this;
    },

    emit(event, data) {
      if (!this._listeners[event]) return this;
      this._listeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (e) {
          console.error('[Sorein EventBus] Error in listener for "' + event + '":', e);
        }
      });
      return this;
    }
  };

  /* ============================================================
     UTILITIES
     ============================================================ */

  /**
   * Debounce — delays execution until after wait ms have elapsed
   * @param {Function} fn
   * @param {number} wait - milliseconds
   * @returns {Function}
   */
  function debounce(fn, wait) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /**
   * Throttle — limits execution to once per limit ms
   * @param {Function} fn
   * @param {number} limit - milliseconds
   * @returns {Function}
   */
  function throttle(fn, limit) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        return fn.apply(this, args);
      }
    };
  }

  /**
   * Format money — converts cents to a formatted SEK string
   * @param {number} cents - price in cents (Shopify uses cents)
   * @param {string} [format] - 'SEK', 'symbol', or 'compact'
   * @returns {string}
   */
  function formatMoney(cents, format) {
    if (typeof cents !== 'number' || isNaN(cents)) return '';

    const amount = cents / 100;

    // Format with Swedish locale
    const formatted = new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);

    if (format === 'compact' && amount >= 1000) {
      const compact = (amount / 1000).toFixed(1).replace('.0', '');
      return compact + ' tkr';
    }

    if (format === 'symbol') {
      return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' kr';
    }

    return formatted;
  }

  /**
   * Format weight from grams to display kg
   * @param {number} grams
   * @returns {string}
   */
  function formatWeight(grams) {
    if (typeof grams !== 'number' || isNaN(grams)) return '';
    const kg = grams / 1000;
    return kg.toFixed(1) + ' kg';
  }

  /**
   * Deep merge objects
   * @param {Object} target
   * @param {Object} source
   * @returns {Object}
   */
  function deepMerge(target, source) {
    const result = Object.assign({}, target);
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  /* ============================================================
     SCROLL LOCK
     Prevents body scroll when modal/drawer is open
     ============================================================ */

  const ScrollLock = {
    _count: 0,
    _scrollY: 0,

    lock() {
      this._count++;
      if (this._count === 1) {
        this._scrollY = window.scrollY;
        document.body.classList.add('srn-scroll-locked');
        document.body.style.top = '-' + this._scrollY + 'px';
      }
    },

    unlock() {
      this._count = Math.max(0, this._count - 1);
      if (this._count === 0) {
        document.body.classList.remove('srn-scroll-locked');
        document.body.style.top = '';
        window.scrollTo(0, this._scrollY);
      }
    },

    isLocked() {
      return this._count > 0;
    }
  };

  /* ============================================================
     TOAST / NOTIFICATION SYSTEM
     ============================================================ */

  const Toast = {
    _container: null,
    _defaultDuration: 4000,

    _getContainer() {
      if (!this._container) {
        this._container = document.getElementById('srn-toast-container');
        if (!this._container) {
          this._container = document.createElement('div');
          this._container.id = 'srn-toast-container';
          this._container.className = 'srn-toast-container';
          this._container.setAttribute('aria-live', 'polite');
          this._container.setAttribute('aria-atomic', 'false');
          document.body.appendChild(this._container);
        }
      }
      return this._container;
    },

    show(message, type, duration) {
      const container = this._getContainer();
      const toast = document.createElement('div');
      const resolvedDuration = duration || this._defaultDuration;
      const resolvedType = type || 'info';

      toast.className = 'srn-toast srn-toast--' + resolvedType;
      toast.setAttribute('role', 'status');
      toast.textContent = message;

      container.appendChild(toast);

      // Auto-remove
      const removeTimer = setTimeout(() => {
        this._remove(toast);
      }, resolvedDuration);

      // Allow manual dismiss
      toast.addEventListener('click', () => {
        clearTimeout(removeTimer);
        this._remove(toast);
      });

      return toast;
    },

    success(message, duration) {
      return this.show(message, 'success', duration);
    },

    error(message, duration) {
      return this.show(message, 'error', duration || 6000);
    },

    info(message, duration) {
      return this.show(message, 'info', duration);
    },

    _remove(toast) {
      if (!toast || !toast.parentNode) return;
      toast.style.animation = 'srn-fade-in 200ms reverse forwards';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 200);
    }
  };

  /* ============================================================
     CART API
     Wrappers for Shopify cart endpoints
     ============================================================ */

  const Cart = {
    /**
     * Fetch the current cart state
     * @returns {Promise<Object>} cart object
     */
    async getCart() {
      const response = await fetch('/cart.js', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to fetch cart');
      return response.json();
    },

    /**
     * Add one or more items to the cart
     * @param {Array<{id: number, quantity: number, properties?: Object}>} items
     * @returns {Promise<Object>} response
     */
    async addItems(items) {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.description || data.message || 'Failed to add to cart';
        throw new Error(errorMessage);
      }

      return data;
    },

    /**
     * Add a single item to the cart
     * @param {number} variantId
     * @param {number} quantity
     * @param {Object} [properties]
     * @returns {Promise<Object>}
     */
    async addItem(variantId, quantity, properties) {
      const item = { id: variantId, quantity: quantity || 1 };
      if (properties && Object.keys(properties).length > 0) {
        item.properties = properties;
      }
      return this.addItems([item]);
    },

    /**
     * Change item quantity in cart
     * @param {number|string} lineOrId - line index (1-based) or variant id
     * @param {number} quantity
     * @param {boolean} [useLine] - if true, treats first arg as line index
     * @returns {Promise<Object>}
     */
    async changeItem(lineOrId, quantity, useLine) {
      const body = useLine
        ? { line: lineOrId, quantity }
        : { id: lineOrId, quantity };

      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.description || 'Failed to update cart');
      return data;
    },

    /**
     * Remove an item from the cart (set quantity to 0)
     * @param {number} variantId
     * @returns {Promise<Object>}
     */
    async removeItem(variantId) {
      return this.changeItem(variantId, 0, false);
    },

    /**
     * Update multiple cart items at once
     * @param {Object} updates - { variantId: quantity, ... }
     * @returns {Promise<Object>}
     */
    async updateCart(updates) {
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.description || 'Failed to update cart');
      return data;
    },

    /**
     * Clear all items from cart
     * @returns {Promise<Object>}
     */
    async clearCart() {
      const response = await fetch('/cart/clear.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (!response.ok) throw new Error('Failed to clear cart');
      return data;
    },

    /**
     * Add a note to the cart
     * @param {string} note
     * @returns {Promise<Object>}
     */
    async setNote(note) {
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note })
      });
      const data = await response.json();
      if (!response.ok) throw new Error('Failed to update cart note');
      return data;
    }
  };

  /* ============================================================
     CART COUNT UPDATE
     Updates all cart count badges in the DOM
     ============================================================ */

  function updateCartCount(count) {
    const countEls = document.querySelectorAll('[data-cart-count]');
    countEls.forEach(el => {
      el.textContent = count;
      el.setAttribute('aria-label', count + ' items in cart');

      // Show/hide based on count
      if (count > 0) {
        el.removeAttribute('hidden');
        el.classList.add('has-items');
      } else {
        el.classList.remove('has-items');
      }
    });
  }

  /**
   * Refresh cart count from Shopify
   */
  async function refreshCartCount() {
    try {
      const cart = await Cart.getCart();
      updateCartCount(cart.item_count);
      EventBus.emit('cart:updated', cart);
      return cart;
    } catch (e) {
      console.warn('[Sorein] Could not refresh cart count:', e);
    }
  }

  /* ============================================================
     MOBILE MENU HELPERS
     ============================================================ */

  const MobileMenu = {
    _menu: null,
    _toggle: null,
    _isOpen: false,

    init() {
      this._menu = document.getElementById('srn-mobile-menu');
      this._toggle = document.querySelector('[data-mobile-menu-toggle]');

      if (!this._menu || !this._toggle) return;

      this._toggle.addEventListener('click', () => this.toggle());

      // Close on overlay click
      const overlay = document.getElementById('srn-scroll-overlay');
      if (overlay) {
        overlay.addEventListener('click', () => this.close());
      }

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this._isOpen) this.close();
      });
    },

    toggle() {
      this._isOpen ? this.close() : this.open();
    },

    open() {
      if (!this._menu) return;
      this._isOpen = true;
      this._menu.classList.add('is-open');
      this._menu.setAttribute('aria-hidden', 'false');

      if (this._toggle) {
        this._toggle.setAttribute('aria-expanded', 'true');
        this._toggle.setAttribute('aria-label', 'Close menu');
      }

      const overlay = document.getElementById('srn-scroll-overlay');
      if (overlay) overlay.classList.add('is-active');

      ScrollLock.lock();
      EventBus.emit('menu:opened');

      // Focus first link
      const firstLink = this._menu.querySelector('a, button');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    },

    close() {
      if (!this._menu) return;
      this._isOpen = false;
      this._menu.classList.remove('is-open');
      this._menu.setAttribute('aria-hidden', 'true');

      if (this._toggle) {
        this._toggle.setAttribute('aria-expanded', 'false');
        this._toggle.setAttribute('aria-label', 'Open menu');
      }

      const overlay = document.getElementById('srn-scroll-overlay');
      if (overlay) overlay.classList.remove('is-active');

      ScrollLock.unlock();
      EventBus.emit('menu:closed');
    }
  };

  /* ============================================================
     CART DRAWER HELPERS
     ============================================================ */

  const CartDrawer = {
    _drawer: null,
    _isOpen: false,

    init() {
      this._drawer = document.getElementById('srn-cart-drawer');
      if (!this._drawer) return;

      // Close buttons
      const closeButtons = this._drawer.querySelectorAll('[data-cart-drawer-close]');
      closeButtons.forEach(btn => {
        btn.addEventListener('click', () => this.close());
      });

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this._isOpen) this.close();
      });

      // Open trigger
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-cart-drawer-open]');
        if (trigger) {
          e.preventDefault();
          this.open();
        }
      });

      // Listen for cart updates
      EventBus.on('cart:updated', (cart) => {
        this.updateSubtotal(cart.total_price);
      });
    },

    open() {
      if (!this._drawer) return;
      this._isOpen = true;
      this._drawer.classList.add('is-open');
      this._drawer.setAttribute('aria-hidden', 'false');
      ScrollLock.lock();
      EventBus.emit('cart-drawer:opened');

      // Focus close button
      const closeBtn = this._drawer.querySelector('[data-cart-drawer-close]');
      if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
    },

    close() {
      if (!this._drawer) return;
      this._isOpen = false;
      this._drawer.classList.remove('is-open');
      this._drawer.setAttribute('aria-hidden', 'true');
      ScrollLock.unlock();
      EventBus.emit('cart-drawer:closed');
    },

    toggle() {
      this._isOpen ? this.close() : this.open();
    },

    updateSubtotal(cents) {
      const el = document.getElementById('srn-cart-drawer-subtotal');
      if (el) el.textContent = formatMoney(cents);
    }
  };

  /* ============================================================
     ADD TO CART HANDLER
     Global handler for [data-add-to-cart] buttons
     ============================================================ */

  async function handleAddToCart(btn) {
    const variantId = btn.dataset.variantId;
    const quantity = parseInt(btn.dataset.quantity || '1', 10);
    const cartType = document.body.dataset.cartType || 'page';

    if (!variantId) {
      console.warn('[Sorein] Add to cart button missing data-variant-id');
      return;
    }

    // Set loading state
    const originalText = btn.innerHTML;
    btn.classList.add('srn-btn--loading');
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;

    try {
      await Cart.addItem(parseInt(variantId, 10), quantity);
      const cart = await refreshCartCount();

      Toast.success(btn.dataset.successMessage || 'Added to cart');

      if (cartType === 'drawer') {
        CartDrawer.open();
      }

      EventBus.emit('product:added-to-cart', {
        variantId,
        quantity,
        cart
      });

    } catch (error) {
      console.error('[Sorein] Add to cart error:', error);
      Toast.error(error.message || 'Could not add to cart. Please try again.');
      EventBus.emit('product:add-to-cart-error', { error });
    } finally {
      btn.classList.remove('srn-btn--loading');
      btn.removeAttribute('aria-busy');
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }

  /* ============================================================
     GLOBAL EVENT LISTENERS
     ============================================================ */

  function initGlobalListeners() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-add-to-cart]');
      if (btn) {
        e.preventDefault();
        handleAddToCart(btn);
      }
    });

    // Quantity inputs
    document.addEventListener('change', (e) => {
      const input = e.target.closest('[data-cart-quantity]');
      if (input) {
        const variantId = input.dataset.variantId;
        const quantity = parseInt(input.value, 10);
        if (variantId && quantity >= 0) {
          Cart.changeItem(parseInt(variantId, 10), quantity)
            .then(refreshCartCount)
            .catch(err => Toast.error(err.message));
        }
      }
    });

    // Remove item buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-remove-item]');
      if (btn) {
        e.preventDefault();
        const variantId = btn.dataset.variantId;
        if (variantId) {
          Cart.removeItem(parseInt(variantId, 10))
            .then(refreshCartCount)
            .then(() => {
              // Remove line item from DOM if present
              const item = btn.closest('[data-cart-item]');
              if (item) item.remove();
            })
            .catch(err => Toast.error(err.message));
        }
      }
    });
  }

  /* ============================================================
     INTERSECTION OBSERVER — Reveal animations
     ============================================================ */

  function initRevealObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('srn-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-srn-reveal]').forEach(el => {
      observer.observe(el);
    });
  }

  /* ============================================================
     THEME EDITOR SUPPORT
     ============================================================ */

  function onSectionLoad(event) {
    // Re-init reveal observers when sections are loaded in editor
    initRevealObserver();
    MobileMenu.init();
  }

  /* ============================================================
     INIT
     ============================================================ */

  function init() {
    // Initialize components
    MobileMenu.init();
    CartDrawer.init();
    initGlobalListeners();
    initRevealObserver();

    // Refresh cart count on page load
    refreshCartCount();

    // Expose theme editor hook
    if (window.Shopify && window.Shopify.designMode) {
      document.addEventListener('shopify:section:load', onSectionLoad);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ============================================================
     PUBLIC API
     Exposed as window.SoreinTheme
     ============================================================ */

  window.SoreinTheme = {
    // Cart
    Cart,
    addItem: (variantId, qty, props) => Cart.addItem(variantId, qty, props),
    refreshCartCount,

    // UI
    Toast,
    CartDrawer,
    MobileMenu,
    ScrollLock,

    // Utilities
    debounce,
    throttle,
    formatMoney,
    formatWeight,
    deepMerge,

    // Event bus
    EventBus,

    // Theme editor
    onSectionLoad,

    // Version
    version: '1.0.0'
  };

})();
