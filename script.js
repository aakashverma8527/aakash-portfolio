// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact Form Submission Feedback
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('#name').value.trim();
    const email = this.querySelector('#email').value.trim();
    const message = this.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulate form submission (e.g., via API or email handler)
    alert("Thank you! Your message has been submitted.");
    this.reset();
  });
}

// Optional: Mobile Nav Toggle
const navToggle = document.querySelector('.nav-toggle'); // Add .nav-toggle in HTML for mobile menu icon
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}
