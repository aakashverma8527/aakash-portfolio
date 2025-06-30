// ==========================
// script.js - Aakash Verma Portfolio
// ==========================

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  enhanceFocusIndicators();
});

/**
 * Initializes mobile navigation toggle with accessibility.
 */
function initNavToggle() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });
  }
}

/**
 * Enhances keyboard focus outline only when using Tab.
 */
function enhanceFocusIndicators() {
  let usingKeyboard = false;

  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      usingKeyboard = true;
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', disableTabOutline);
    }
  }

  function disableTabOutline() {
    usingKeyboard = false;
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('mousedown', disableTabOutline);
    window.addEventListener('keydown', handleFirstTab);
  }

  window.addEventListener('keydown', handleFirstTab);
}
