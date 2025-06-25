// script.js

// ==== Toggle Mobile Navigation ====
function initMenuToggle() {
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");

      // Optional Accessibility Update
      const expanded = nav.classList.contains("active");
      nav.setAttribute("aria-expanded", expanded);
    });
  }
}

// ==== Contact Form Validation ====
function initFormValidation() {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const errorDiv = document.getElementById("form-error");

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
}

// ==== Portfolio Image Hover Preview ====
function initImageHover() {
  const images = document.querySelectorAll(".portfolio-img");

  images.forEach((img) => {
    img.addEventListener("mouseover", () => {
      img.classList.add("hovered");
    });
    img.addEventListener("mouseout", () => {
      img.classList.remove("hovered");
    });
  });
}

// ==== Init all after DOM Loaded ====
document.addEventListener("DOMContentLoaded", function () {
  initMenuToggle();
  initFormValidation();
  initImageHover();
});
