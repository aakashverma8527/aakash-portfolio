// script.js

// ==== Toggle Mobile Navigation ====
function initMenuToggle() {
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");

    // Accessibility: Update aria-expanded state
    const expanded = nav.classList.contains("active");
    nav.setAttribute("aria-expanded", expanded);
  });
}

// ==== Contact Form Validation ====
function initFormValidation() {
  const form = document.getElementById("contact-form");
  const errorDiv = document.getElementById("form-error");

  if (!form || !errorDiv) return;

  form.addEventListener("submit", (e) => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

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
