// script.js

// ==== Toggle Mobile Navigation ====
const toggleMenu = () => {
  const nav = document.getElementById("nav-links");
  nav.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-toggle");
  if (menuBtn) {
    menuBtn.addEventListener("click", toggleMenu);
  }

  // ==== Contact Form Validation ====
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const errorDiv = document.getElementById("form-error");

      if (!name || !email || !message) {
        e.preventDefault();
        errorDiv.textContent = "Please fill out all fields.";
        errorDiv.style.color = "red";
      } else {
        errorDiv.textContent = "";
      }
    });
  }

  // ==== Portfolio Image Hover Preview (optional) ====
  const images = document.querySelectorAll(".portfolio-img");
  images.forEach((img) => {
    img.addEventListener("mouseover", () => {
      img.style.transform = "scale(1.05)";
      img.style.transition = "0.3s";
    });
    img.addEventListener("mouseout", () => {
      img.style.transform = "scale(1)";
    });
  });
});
