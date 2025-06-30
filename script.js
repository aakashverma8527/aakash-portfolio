document.addEventListener("DOMContentLoaded", () => {
  // ✅ Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1"); // for accessibility
        target.focus({ preventScroll: true });
      }
    }, { passive: true });
  });

  // ✅ Reveal on scroll (Intersection Observer)
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // ✅ Contact form with validation & accessibility
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

      // Clear previous errors
      [name, email, message].forEach(input => {
        const errorEl = input.nextElementSibling;
        if (errorEl && errorEl.classList.contains("input-error-msg")) {
          errorEl.remove();
        }
        input.classList.remove("input-error");
        input.removeAttribute("aria-invalid");
      });

      // Validate fields
      [name, email, message].forEach(input => {
        if (!input.value.trim()) {
          const errorText = document.createElement("div");
          errorText.className = "input-error-msg";
          errorText.textContent = `${input.placeholder || "This field"} is required.`;
          input.insertAdjacentElement("afterend", errorText);
          input.classList.add("input-error");
          input.setAttribute("aria-invalid", "true");
          hasError = true;
        }
      });

      if (hasError) {
        statusDiv.textContent = "Please correct the highlighted fields.";
        statusDiv.className = "form-status error";
        statusDiv.focus();
        return;
      }

      // Simulate form submission
      statusDiv.textContent = "Thank you! Your message has been submitted.";
      statusDiv.className = "form-status success";
      this.reset();
    });
  }

  // ✅ Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
      navLinks.style.maxHeight = isOpen ? navLinks.scrollHeight + "px" : null;
    };

    navToggle.addEventListener("click", toggleMenu);

    // Close menu when clicking outside
    document.addEventListener("click", e => {
      if (
        !navToggle.contains(e.target) &&
        !navLinks.contains(e.target) &&
        navLinks.classList.contains("open")
      ) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.style.maxHeight = null;
      }
    });

    // Close menu on link click (single-page style)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.style.maxHeight = null;
      });
    });
  }
});
