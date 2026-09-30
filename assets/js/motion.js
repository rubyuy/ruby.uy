(function () {
  'use strict';

  window.__piMotionReady = true;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Kick the homepage overture once the first paint is committed.
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      document.documentElement.classList.add('is-ready');
    });
  });

  // --- Stagger assignment ---------------------------------------------------
  document.querySelectorAll('[data-reveal-stagger]').forEach(function (group) {
    var items = group.querySelectorAll('[data-reveal]');
    Array.prototype.forEach.call(items, function (item, index) {
      item.style.setProperty('--reveal-index', String(Math.min(index, 8)));
    });
  });

  // --- Scroll reveal --------------------------------------------------------
  var revealables = document.querySelectorAll('[data-reveal]');

  function revealAll() {
    revealables.forEach(function (el) { el.classList.add('is-revealed'); });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealAll();
  } else if (revealables.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );

    revealables.forEach(function (el) { observer.observe(el); });
  }

  // --- Count up -------------------------------------------------------------
  function formatNumber(value) {
    try {
      return new Intl.NumberFormat('es-UY').format(value);
    } catch (error) {
      return String(value);
    }
  }

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;

    if (reduceMotion) {
      el.textContent = formatNumber(target);
      return;
    }

    var duration = 1100;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = formatNumber(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('[data-count]');

  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countUp(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = formatNumber(parseInt(el.getAttribute('data-count'), 10) || 0);
    });
  }
})();
