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
  if (mainContent) {
    document.querySelectorAll('a.skip-link').forEach(link => {
      link.addEventListener('click', () => {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
        mainContent.addEventListener('blur', () => {
          mainContent.removeAttribute('tabindex');
        }, { once: true });
      });
    });
  }
};

// ==========================
// Navigation
// ==========================
const initNavToggle = () => {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('open');
    });
  }
};

// ==========================
// Keyboard Focus Outline
// ==========================
const enhanceFocusIndicators = () => {
  const enableTabOutline = () => {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', onFirstTab);
    window.addEventListener('mousedown', disableTabOutline);
  };

  const disableTabOutline = () => {
    document.body.classList.remove('user-is-tabbing');
    window.removeEventListener('mousedown', disableTabOutline);
    window.addEventListener('keydown', onFirstTab);
  };

  const onFirstTab = e => {
    if (e.key === 'Tab') {
      enableTabOutline();
    }
  };

  window.addEventListener('keydown', onFirstTab);
};

// ==========================
// Smooth Scroll for Anchor Links
// ==========================
const enableSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  links.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').slice(1);
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
// Form Handling
// ==========================
const handleContactForm = () => {
  const form = document.querySelector('.contact-form');

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const subject = form.querySelector('#subject')?.value.trim() || '(No Subject)';
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Simulate form submission
    console.log('Contact Form Submission:', { name, email, subject, message });

    // Show simple alert
    alert(`Thanks, ${name}! Your message has been received.`);

    // Optionally reset form
    form.reset();
  });
};
