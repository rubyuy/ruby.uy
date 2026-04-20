(function () {
  'use strict';

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function initCarousel(root) {
    var track = root.querySelector('[data-track]');
    var slides = root.querySelectorAll('[data-slide]');
    var prevBtn = root.querySelector('[data-prev]');
    var nextBtn = root.querySelector('[data-next]');
    var counter = root.closest('.charla-destacada').querySelector('[data-counter]');

    if (!track || slides.length === 0) {
      return;
    }

    var total = slides.length;
    var current = 0;

    function updateCounter() {
      if (counter) {
        counter.textContent = pad2(current + 1) + ' / ' + pad2(total);
      }
      if (prevBtn) {
        prevBtn.disabled = current === 0;
      }
      if (nextBtn) {
        nextBtn.disabled = current === total - 1;
      }
    }

    function scrollToIndex(index) {
      var target = slides[index];
      if (!target) return;
      target.scrollIntoView({ inline: 'start', behavior: 'smooth', block: 'nearest' });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (current > 0) scrollToIndex(current - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (current < total - 1) scrollToIndex(current + 1);
      });
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
              var idx = Array.prototype.indexOf.call(slides, entry.target);
              if (idx !== -1 && idx !== current) {
                current = idx;
                updateCounter();
              }
            }
          });
        },
        { root: track, threshold: [0.6] }
      );
      slides.forEach(function (slide) {
        observer.observe(slide);
      });
    }

    updateCounter();
  }

  function init() {
    var carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach(function (root) {
      initCarousel(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
