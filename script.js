// ================================
// 1. Mobile Navigation Toggle
// ================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-bar ul');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
  });

  // Accessibility: Toggle with keyboard
  navToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navToggle.click();
    }
  });
}

// ================================
// 2. Smooth Scroll for Anchor Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ================================
// 3. Contact Form Validation (Enhanced)
// ================================
const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', e => {
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    let valid = true;

    // Clear previous messages
    form.querySelectorAll('.error-message').forEach(el => el.remove());

    [name, email, message].forEach(field => {
      if (!field?.value.trim()) {
        valid = false;
        const msg = document.createElement('div');
        msg.className = 'error-message';
        msg.style.color = 'red';
        msg.style.fontSize = '0.9em';
        msg.textContent = `${field.previousElementSibling.textContent} is required.`;
        field.insertAdjacentElement('afterend', msg);
      }
    });

    if (!valid) {
      e.preventDefault();
    }
  });
}

// ================================
// 4. Scroll Reveal Animation (Debounced)
// ================================
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('visible');
    }
  });
};

// Debounce utility
function debounce(func, wait = 20) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

window.addEventListener('scroll', debounce(revealOnScroll));
window.addEventListener('load', revealOnScroll);
