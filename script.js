// ✅ JavaScript Enhancements for Portfolio Website

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, { passive: true });
  });

  // ✅ Contact Form Handling with Inline Validation and Accessibility
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    const statusDiv = document.createElement("div");
    statusDiv.className = "form-status";
    statusDiv.setAttribute("aria-live", "polite");
    contactForm.appendChild(statusDiv);

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = this.querySelector("#name");
      const email = this.querySelector("#email");
      const message = this.querySelector("#message");

      let hasError = false;

      [name, email, message].forEach(input => {
        const errorField = input.nextElementSibling;
        input.classList.remove("input-error");
        if (errorField) errorField.textContent = "";

        if (!input.value.trim()) {
          input.classList.add("input-error");
          if (errorField) errorField.textContent = `Please enter your ${input.name}.`;
          hasError = true;
        }
      });

      if (hasError) {
        statusDiv.textContent = "Please fill in all required fields.";
        statusDiv.className = "form-status error";
        statusDiv.focus();
        return;
      }

      statusDiv.textContent = "Thank you! Your message has been submitted.";
      statusDiv.className = "form-status success";
      this.reset();
    });
  }

  // ✅ Mobile Navigation Toggle with Keyboard Support
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    navToggle.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        navToggle.click();
      }
    });

    document.addEventListener("click", e => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ✅ Scroll-Based Reveal Animations with Intersection Observer
  const revealEls = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  revealEls.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });

  // ✅ Carousel Navigation for Featured Projects
  const carousel = document.getElementById("projectCarousel");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (carousel && prevBtn && nextBtn) {
    const slideAmount = 320;

    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: slideAmount, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -slideAmount, behavior: "smooth" });
    });

    // Optional: swipe gesture for mobile
    let startX = 0;
    carousel.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (diff > 50) nextBtn.click();
      else if (diff < -50) prevBtn.click();
    });
  }
});
