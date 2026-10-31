/* Om Patil — portfolio behaviour
   Mobile menu · scroll reveal · project filters · certificate lightbox
   No dependencies. Everything degrades gracefully without JS. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------ Mobile menu */
  (function mobileMenu() {
    var burger = document.querySelector('[data-burger]');
    var menu = document.getElementById('mobile-menu');
    if (!burger || !menu) return;

    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      menu.classList.add('is-open');
      menu.removeAttribute('hidden');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('is-locked');
      var first = menu.querySelector('a, button');
      if (first) first.focus();
    }

    function close(returnFocus) {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('is-locked');
      window.setTimeout(function () {
        if (!menu.classList.contains('is-open')) menu.setAttribute('hidden', '');
      }, 320);
      if (returnFocus && lastFocus) lastFocus.focus();
    }

    burger.addEventListener('click', function () {
      if (burger.getAttribute('aria-expanded') === 'true') close(true);
      else open();
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) close(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (menu.classList.contains('is-open')) close(true);
    });

    // Keep focus inside the open menu
    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !menu.classList.contains('is-open')) return;
      var items = menu.querySelectorAll('a[href], button:not([disabled])');
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && menu.classList.contains('is-open')) close(false);
    });
  })();

  /* ------------------------------------------------------ Scroll reveal */
  (function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target); // once only
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(items, function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
      io.observe(el);
    });
  })();

  /* ---------------------------------------------------- Project filters */
  (function filters() {
    var bar = document.querySelector('[data-filters]');
    var grid = document.querySelector('[data-project-grid]');
    if (!bar || !grid) return;

    var buttons = bar.querySelectorAll('.filter');
    var cards = grid.querySelectorAll('[data-category]');
    var count = document.querySelector('[data-filter-count]');

    function apply(value) {
      var shown = 0;
      Array.prototype.forEach.call(cards, function (card) {
        // a card may carry several space-separated categories
        var cats = (card.getAttribute('data-category') || '').split(/\s+/);
        var match = value === 'all' || cats.indexOf(value) !== -1;
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      if (count) {
        count.textContent = shown + (shown === 1 ? ' project' : ' projects');
      }
    }

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener('click', function () {
        Array.prototype.forEach.call(buttons, function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        apply(btn.getAttribute('data-filter'));
      });
    });
  })();

  /* -------------------------------------------------------- Lightbox */
  (function lightbox() {
    var triggers = document.querySelectorAll('[data-lightbox]');
    if (!triggers.length) return;

    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Image preview');
    box.setAttribute('hidden', '');
    box.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close preview">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
      '<path d="M5 5l14 14M19 5L5 19"/></svg></button>' +
      '<figure class="lightbox__figure"><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(box);

    var img = box.querySelector('img');
    var cap = box.querySelector('figcaption');
    var closeBtn = box.querySelector('.lightbox__close');
    var opener = null;

    function open(trigger) {
      opener = trigger;
      img.src = trigger.getAttribute('data-lightbox');
      img.alt = trigger.getAttribute('data-lightbox-alt') || '';
      cap.textContent = trigger.getAttribute('data-lightbox-caption') || '';
      box.removeAttribute('hidden');
      document.body.classList.add('is-locked');
      window.requestAnimationFrame(function () { box.classList.add('is-open'); });
      closeBtn.focus();
    }

    function close() {
      box.classList.remove('is-open');
      document.body.classList.remove('is-locked');
      window.setTimeout(function () {
        box.setAttribute('hidden', '');
        img.removeAttribute('src');
      }, reduceMotion ? 0 : 250);
      if (opener) opener.focus();
    }

    Array.prototype.forEach.call(triggers, function (t) {
      t.addEventListener('click', function (e) { e.preventDefault(); open(t); });
    });

    closeBtn.addEventListener('click', close);
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lightbox__figure')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (box.hasAttribute('hidden')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
    });
  })();

  /* --------------------------------------------------------- Map embed */
  /* The iframe is only created on click, so nothing is requested from
     Google until the visitor asks for it. */
  (function mapEmbed() {
    var card = document.querySelector('[data-map]');
    if (!card) return;
    var btn = card.querySelector('[data-map-load]');
    var placeholder = card.querySelector('[data-map-placeholder]');
    if (!btn || !placeholder) return;

    btn.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = 'https://www.google.com/maps?q=Neckarsulm,+Germany&z=12&output=embed';
      frame.title = 'Map of Neckarsulm, Germany';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.allowFullscreen = true;
      card.appendChild(frame);
      placeholder.remove();
      frame.focus();
    });
  })();

  /* ------------------------------------------------- Footer year stamp */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
