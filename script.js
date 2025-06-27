// ==============================
// 1. MOBILE NAVIGATION TOGGLE
// ==============================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  const toggleMenu = () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
  };

  navToggle.addEventListener('click', toggleMenu);

  navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
}

// ==============================
// 2. SMOOTH SCROLL FOR ANCHORS
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==============================
// 3. CONTACT FORM VALIDATION
// ==============================
const contactForm = document.querySelector('form');
const errorClass = 'form-error';

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    // Clear previous errors
    document.querySelectorAll(`.${errorClass}`)?.forEach(el => el.remove());

    let valid = true;

    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');

    const showError = (field, message) => {
      const error = document.createElement('div');
      error.className = errorClass;
      error.style.color = 'red';
      error.style.marginTop = '4px';
      error.setAttribute('role', 'alert');
      error.textContent = message;
      field?.parentNode?.insertBefore(error, field.nextSibling);
    };

    if (!name?.value.trim()) {
      showError(name, 'Name is required.');
      valid = false;
    }

    if (!email?.value.trim()) {
      showError(email, 'Email is required.');
      valid = false;
    }

    if (!message?.value.trim()) {
      showError(message, 'Message cannot be empty.');
      valid = false;
    }

    if (!valid) {
      e.preventDefault(); // Stop form submission
    }
  });
}

// ==============================
// 4. SCROLL-BASED REVEAL ANIMATION
// ==============================
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
  const debounce = (func, delay = 100) => {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, delay);
    };
  };

  const handleReveal = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight * 0.85) {
        el.classList.add('visible');
      }
    });
  };

  const debouncedReveal = debounce(handleReveal, 100);
  window.addEventListener('scroll', debouncedReveal);
  window.addEventListener('load', handleReveal);
}

// ==============================
// 5. ACCESSIBILITY & CODE QUALITY
// ==============================
// All selectors use querySelector/querySelectorAll
// Optional chaining (?.) used where applicable
// All logic wrapped in feature checks
// Comments included for clarity
