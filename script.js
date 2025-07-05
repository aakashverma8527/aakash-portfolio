// ==========================
// script.js - Aakash Verma Portfolio
// ==========================

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  handleSkipLinkFocus();
  initNavToggle();
  enhanceFocusIndicators();
  enableSmoothScroll();
  handleContactForm();
});

// ==========================
// Skip Link Focus Handler
// ==========================
const handleSkipLinkFocus = () => {
  const mainContent = document.querySelector('#main-content');
  document.querySelectorAll('.skip-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
        mainContent.addEventListener(
          'blur',
          () => mainContent.removeAttribute('tabindex'),
          { once: true }
        );
      }
    });
  });
};

// ==========================
// Navigation Toggle
// ==========================
const initNavToggle = () => {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  toggleBtn?.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    navMenu?.classList.toggle('open');
  });
};

// ==========================
// Keyboard Focus Indicator
// ==========================
const enhanceFocusIndicators = () => {
  const onFirstTab = e => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', onFirstTab);
      window.addEventListener('mousedown', () => {
        document.body.classList.remove('user-is-tabbing');
        window.addEventListener('keydown', onFirstTab);
      }, { once: true });
    }
  };

  window.addEventListener('keydown', onFirstTab);
};

// ==========================
// Smooth Scroll for Anchors
// ==========================
const enableSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href')?.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetElement.focus({ preventScroll: true });
      }
    });
  });
};

// ==========================
// Contact Form Handling
// ==========================
const handleContactForm = () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = {
      name: form.querySelector('#name')?.value.trim(),
      email: form.querySelector('#email')?.value.trim(),
      subject: form.querySelector('#subject')?.value.trim() || '(No Subject)',
      message: form.querySelector('#message')?.value.trim(),
    };

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Simulated submission
    console.log('📨 Contact Form Submission:', formData);
    alert(`✅ Thanks, ${formData.name}! Your message has been sent.`);

    form.reset();
  });
};
