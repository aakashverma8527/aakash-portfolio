/* ============================================================================
   📱 Mobile Navigation Toggle (Burger Menu)
============================================================================ */
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  if (burger && navMenu) {
    burger.addEventListener('click', function () {
      const isExpanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('is-open');
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        burger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        burger.focus();
      }
    });
  }
});

/* ============================================================================
   🌀 AOS (Animate On Scroll) Initialization
============================================================================ */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  AOS.init({
    duration: 800,
    once: true
  });
}

/* ============================================================================
   🔗 Smooth Scrolling for Internal Links
============================================================================ */
document.addEventListener('click', function (e) {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    }
  }
});
