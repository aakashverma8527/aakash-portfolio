// ✅ Portfolio Script - Modern, Accessible, Modular

// Smooth Scroll for Anchor Links
const enableSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, { passive: true });
  });
};

// Contact Form Validation
const initContactForm = () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const status = document.createElement('div');
  status.className = 'form-status';
  status.setAttribute('aria-live', 'polite');
  form.appendChild(status);

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    let valid = true;
    [name, email, message].forEach(input => {
      const error = input.nextElementSibling;
      input.classList.remove('input-error');
      error.textContent = '';

      if (!input.value.trim()) {
        input.classList.add('input-error');
        error.textContent = `Please enter your ${input.name}.`;
        valid = false;
      }
    });

    if (!valid) {
      status.textContent = '❌ Please fill in all required fields.';
      status.className = 'form-status error';
      return;
    }

    status.textContent = '✅ Thank you! I will get back to you soon.';
    status.className = 'form-status success';
    form.reset();
  });
};

// Mobile Navigation Toggle
const initMobileNav = () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
  });

  toggle.addEventListener('keydown', e => {
    if (['Escape', 'Enter'].includes(e.key)) toggle.click();
  });

  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
};

// Scroll Reveal Animations
const initRevealAnimations = () => {
  const elements = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });
};

// Carousel Logic
const initCarousel = () => {
  const track = document.getElementById('projectCarousel');
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');

  if (!track || !prev || !next) return;

  const scrollAmount = 320;
  next.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
  prev.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  // Swipe for mobile
  let startX = 0;
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 50) next.click();
    else if (diff < -50) prev.click();
  });
};

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
  enableSmoothScroll();
  initContactForm();
  initMobileNav();
  initRevealAnimations();
  initCarousel();
});
