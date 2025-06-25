// script.js – Modular Interactive Portfolio Enhancements

// ✅ DOM Ready Entry Point
window.addEventListener("DOMContentLoaded", () => {
  initAccordion();
  initDarkMode();
  initScrollToTop();
  initRevealOnScroll();
});

// ================= ACCORDION =================
function initAccordion() {
  document.querySelectorAll(".accordion-toggle").forEach((button) => {
    const content = button.nextElementSibling;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", content.id);
    button.setAttribute("tabindex", "0");

    button.addEventListener("click", () => toggleAccordion(button));
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleAccordion(button);
      }
    });
  });
}

function toggleAccordion(button) {
  const content = button.nextElementSibling;
  const isOpen = content.classList.contains("open");

  // Close all open accordions
  document.querySelectorAll(".accordion-content.open").forEach((el) => {
    el.classList.remove("open");
    el.previousElementSibling.setAttribute("aria-expanded", "false");
  });

  // Open the clicked one
  if (!isOpen) {
    content.classList.add("open");
    button.setAttribute("aria-expanded", "true");
  }
}

// ================= DARK MODE =================
function initDarkMode() {
  const existingToggle = document.getElementById("darkToggle");
  if (!existingToggle) return;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  document.body.classList.toggle("dark-mode", savedTheme === "dark");

  existingToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });
}

// ================= SCROLL TO TOP =================
function initScrollToTop() {
  const existingBtn = document.getElementById("scrollTop");
  if (!existingBtn) return;

  window.addEventListener("scroll", () => {
    existingBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  existingBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================= SCROLL REVEAL =================
function initRevealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => observer.observe(el));
}
