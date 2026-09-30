(function () {
  'use strict';

  var nav = document.querySelector('[data-nav]');
  if (!nav) return;

  var toggle = nav.querySelector('[data-nav-toggle]');
  var menu = nav.querySelector('[data-nav-menu]');

  // Mark the current section so the bar always says where you are.
  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  nav.querySelectorAll('.site-nav__links a').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    var target = href.split('#')[0].replace(/\/+$/, '') || '/';
    if (target !== '/' && (path === target || path.indexOf(target + '/') === 0)) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  function closeMenu() {
    nav.classList.remove('is-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    }
  }

  function openMenu() {
    nav.classList.add('is-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar menú');
    }
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target)) closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 940) closeMenu();
    });
  }

  // Give the bar depth once the page moves under it.
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    });
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
