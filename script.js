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

  document.querySelectorAll(".accordion-content.open").forEach((el) => {
    el.classList.remove("open");
    el.previousElementSibling.setAttribute("aria-expanded", "false");
  });

  if (!isOpen) {
    content.classList.add("open");
    button.setAttribute("aria-expanded", "true");
  }
}

// ================= DARK MODE =================
function initDarkMode() {
  const toggleBtn = document.createElement("button");
  toggleBtn.innerHTML = "<span aria-hidden='true'>🌓</span><span class='visually-hidden'>Toggle Theme</span>";
  toggleBtn.className = "dark-toggle btn-secondary";
  toggleBtn.setAttribute("aria-label", "Toggle dark mode");
  document.body.appendChild(toggleBtn);

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  document.body.classList.toggle("dark-mode", savedTheme === "dark");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });
}

// ================= SCROLL TO TOP =================
function initScrollToTop() {
  const btn = document.createElement("button");
  btn.innerHTML = "⬆";
  btn.className = "scroll-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.style.display = "none";
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 300);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================= SCROLL REVEAL =================
function initRevealOnScroll() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("section, .project, .card, .testimonial").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
