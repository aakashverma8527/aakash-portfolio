// script.js

// ==== Toggle Mobile Navigation ====
function initMenuToggle() {
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (!menuBtn || !nav) return;

  menuBtn.setAttribute("aria-expanded", "false"); // Initial state

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");

    // Accessibility: Update aria-expanded on the button, not nav
    const expanded = nav.classList.contains("active");
    menuBtn.setAttribute("aria-expanded", expanded.toString());
  });
}

// ==== Contact Form Validation ====
function initFormValidation() {
  const form = document.getElementById("contact-form");
  const errorDiv = document.getElementById("form-error");

  if (!form || !errorDiv) return;

  // Clear error message on user input
  form.addEventListener("input", () => {
    errorDiv.textContent = "";
  });

  form.addEventListener("submit", (e) => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      e.preventDefault();
      errorDiv.textContent = "Please fill out all fields.";
      errorDiv.style.color = "red";
    } else if (!emailRegex.test(email)) {
      e.preventDefault();
      errorDiv.textContent = "Please enter a valid email address.";
      errorDiv.style.color = "red";
    } else {
      errorDiv.textContent = "";
    }
  });
}

// ==== Portfolio Image Hover Preview ====
function initImageHover() {
  const images = document.querySelectorAll(".portfolio-img");

  images.forEach((img) => {
    img.addEventListener("mouseenter", () => img.classList.add("hovered"));
    img.addEventListener("mouseleave", () => img.classList.remove("hovered"));
  });
}

// ==== Initialize all functions after DOM Content Loaded ====
document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle();
  initFormValidation();
  initImageHover();
});
