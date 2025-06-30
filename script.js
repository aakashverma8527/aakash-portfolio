document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener(
      "click",
      function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      },
      { passive: true }
    );
  });

  // Contact form handling with accessibility
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
        input.classList.remove("input-error");
        if (!input.value.trim()) {
          input.classList.add("input-error");
          hasError = true;
        }
      });

      if (hasError) {
        statusDiv.textContent = "Please fill in all fields.";
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

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open")
      );
    });

    // Close nav if user clicks outside
    document.addEventListener("click", e => {
      if (
        !navToggle.contains(e.target) &&
        !navLinks.contains(e.target) &&
        navLinks.classList.contains("open")
      ) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
});
