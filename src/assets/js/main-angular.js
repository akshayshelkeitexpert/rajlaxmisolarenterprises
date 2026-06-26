/**
 * eBusiness template — global UI only (nav, scroll, preloader).
 * Swiper, AOS, Isotope, GLightbox, PureCounter, FAQ toggles are handled in Angular (EbusinessWidgetsService).
 */
(function () {
  'use strict';

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader || (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top'))) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav: use document-level delegation so listeners work after Angular
   * renders the header (querySelector at script load runs too early and gets null).
   */
  function syncMobileNavIcon(toggleBtn) {
    const btn = toggleBtn || document.querySelector('.mobile-nav-toggle');
    if (!btn) return;
    const open = document.body.classList.contains('mobile-nav-active');
    btn.classList.toggle('bi-list', !open);
    btn.classList.toggle('bi-x', open);
  }

  function mobileNavToggle(toggleBtn) {
    document.body.classList.toggle('mobile-nav-active');
    syncMobileNavIcon(toggleBtn);
  }

  document.addEventListener('click', function (e) {
    const target = e.target;
    if (!target || !target.closest) return;

    const toggle = target.closest('.mobile-nav-toggle');
    if (toggle) {
      e.preventDefault();
      mobileNavToggle(toggle);
      return;
    }

    if (document.body.classList.contains('mobile-nav-active')) {
      var navmenu = document.getElementById('navmenu');
      if (navmenu && target === navmenu) {
        document.body.classList.remove('mobile-nav-active');
        syncMobileNavIcon();
        return;
      }
    }

    if (document.body.classList.contains('mobile-nav-active') && target.closest('#navmenu a')) {
      document.body.classList.remove('mobile-nav-active');
      syncMobileNavIcon();
      return;
    }

    const dropdownToggle = target.closest('.navmenu .toggle-dropdown');
    if (dropdownToggle) {
      e.preventDefault();
      dropdownToggle.parentNode.classList.toggle('active');
      const sibling = dropdownToggle.parentNode.nextElementSibling;
      if (sibling) sibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    }
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  window.addEventListener('load', function () {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop, 10),
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  });

  function navmenuScrollspy() {
    const navmenulinks = document.querySelectorAll('.navmenu a');
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash || navmenulink.hash.length < 2) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.navmenu a.active').forEach((link) => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
})();
