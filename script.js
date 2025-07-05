// ==============================
// script.js - Aakash Verma Portfolio
// ==============================

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initSkipLink();
  initNavToggle();
  initFocusIndicator();
  initSmoothScroll();
  initContactForm();
});

// ==============================
// 1️⃣ Skip Link Focus
// ==============================
function initSkipLink() {
  const skipLinks = document.querySelectorAll('.skip-link');
  const mainContent = document.querySelector('#main-content');

  if (!mainContent || skipLinks.length === 0) return;

  skipLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Make main content focusable and move focus
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();

      // Remove tabindex after focus is lost
      mainContent.addEventListener('blur', () => {
        mainContent.removeAttribute('tabindex');
      }, { once: true });
    });
  });
}

// ==============================
// 2️⃣ Mobile Navigation Toggle
// ==============================
function initNavToggle() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

// ==============================
// 3️⃣ Keyboard-Only Focus Class
// ==============================
function initFocusIndicator() {
  const handleFirstTab = (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', () => {
        document.body.classList.remove('user-is-tabbing');
        window.addEventListener('keydown', handleFirstTab, { once: true });
      }, { once: true });
    }
  };

  window.addEventListener('keydown', handleFirstTab);
}

// ==============================
// 4️⃣ Smooth Scroll for Anchor Links
// ==============================
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetEl.focus({ preventScroll: true });
      }
    });
  });
}

// ==============================
// 5️⃣ Contact Form Handler
// ==============================
function initContactForm() {
  const form = document.querySelector('.contact-form');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      alert('⚠️ Please fill out all required fields.');
      return;
    }

    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailPattern.test(email)) {
      alert('⚠️ Please enter a valid email address.');
      return;
    }

    const formData = {
      name,
      email,
      subject: form.querySelector('#subject')?.value.trim() || '(No Subject)',
      message
    };

    console.log('📨 Contact Form Submitted:', formData);
    alert(`✅ Thank you, ${name}! Your message has been sent.`);

    form.reset();
  });
}
