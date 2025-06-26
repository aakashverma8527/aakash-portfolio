// ==== Toggle Mobile Navigation ====
function initMenuToggle() {
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (!menuBtn || !nav) return;

  menuBtn.setAttribute("aria-expanded", "false");

  menuBtn.addEventListener("click", () => {
    const isExpanded = nav.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", isExpanded.toString());
  });

  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// ==== Contact Form Validation with Field-Specific Errors ====
function initFormValidation() {
  const wrapper = document.querySelector(".contact-form-wrapper");
  if (!wrapper) return;

  const form = wrapper.querySelector("#contact-form");
  const errorDiv = wrapper.querySelector("#form-error");
  const successDiv = wrapper.querySelector("#form-success");

  if (!form || !errorDiv) return;

  const showError = (message) => {
    errorDiv.textContent = message;
    errorDiv.style.color = "red";
    errorDiv.setAttribute("aria-live", "assertive");
  };

  const clearFeedback = () => {
    errorDiv.textContent = "";
    errorDiv.removeAttribute("aria-live");
    if (successDiv) successDiv.textContent = "";
  };

  form.addEventListener("input", clearFeedback);

  form.addEventListener("submit", (e) => {
    const name = form.name?.value.trim();
    const email = form.email?.value.trim();
    const message = form.message?.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      e.preventDefault();
      showError("Name is required.");
    } else if (!email) {
      e.preventDefault();
      showError("Email is required.");
    } else if (!emailRegex.test(email)) {
      e.preventDefault();
      showError("Invalid email format.");
    } else if (!message) {
      e.preventDefault();
      showError("Message is required.");
    } else {
      clearFeedback();
      if (successDiv) {
        successDiv.textContent = "Sending message...";
        successDiv.style.color = "green";
        successDiv.setAttribute("aria-live", "polite");
      }
    }
  });
}

// ==== Portfolio Image Hover Effect ====
function initImageHover() {
  const images = document.querySelectorAll(".portfolio-img");
  if (!images.length) {
    console.debug("No .portfolio-img elements found. Skipping hover logic.");
    return;
  }

  images.forEach((img) => {
    img.addEventListener("mouseenter", () => img.classList.add("hovered"));
    img.addEventListener("mouseleave", () => img.classList.remove("hovered"));
  });
}

// ==== DOMContentLoaded Bootstrapping ====
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("menu-toggle")) initMenuToggle();
  if (document.querySelector(".contact-form-wrapper")) initFormValidation();
  if (document.querySelector(".portfolio-img")) initImageHover();
});
