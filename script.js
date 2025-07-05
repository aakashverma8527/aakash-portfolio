// ==========================================
// script.js — Aakash Verma Portfolio
// ==========================================

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initSkipLinkHandler();
  initMobileNavToggle();
  initFocusOutlineHandler();
  initSmoothScrolling();
  initContactFormHandler();
});

// ==========================================
// Skip-link: move focus to #main-content
// ==========================================
function initSkipLinkHandler() {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  document.querySelectorAll('.skip-link').forEach(link => {
    link.addEventListener('click', () => {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      mainContent.addEventListener('blur', () => {
        mainContent.removeAttribute('tabindex');
      }, { once: true });
    });
  });
}

// ==========================================
// Mobile Nav Toggle: open/close menu
// ==========================================
function initMobileNavToggle() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    navMenu.classList.toggle('open');
  });
}

// ==========================================
// Focus Outline: show outlines when tabbing
// ==========================================
function initFocusOutlineHandler() {
  const handleFirstTab = e => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', () => {
        document.body.classList.remove('user-is-tabbing');
        window.addEventListener('keydown', handleFirstTab);
      }, { once: true });
    }
  };
  window.addEventListener('keydown', handleFirstTab);
}

// ==========================================
// Smooth Scroll: animate internal anchors
// ==========================================
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  links.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href')?.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
      }
    });
  });
}

// ==========================================
// Contact Form: validate and handle submit
// ==========================================
function initContactFormHandler() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      alert('⚠️ Please fill out all required fields: Name, Email, and Message.');
      return;
    }

    // Simulated successful submission
    console.log('✅ Contact Form Submitted:', { name, email, message });
    alert(`✅ Thank you, ${name}! Your message has been sent.`);

    form.reset();
  });
}
