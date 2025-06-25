// script.js – Modular Interactive Portfolio Enhancements

document.addEventListener("DOMContentLoaded", () => {
  initAccordion();
  initDarkMode();
  initScrollToTop();
  initRevealOnScroll();
});

// ========== ACCORDION ==========
function initAccordion() {
  const accordionToggles = document.querySelectorAll(".accordion-toggle");

  accordionToggles.forEach((button, index) => {
    const content = button.nextElementSibling;
    if (!content || !content.classList.contains("accordion-content")) return;

    const contentId = content.id || `accordion-${index}`;
    content.id = contentId;

    // Set ARIA attributes
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", contentId);
    button.setAttribute("tabindex", "0");
    button.setAttribute("role", "button");

    button.addEventListener("click", () => toggleAccordion(button, content));
    button.addEventListener("keydown", (e) => {
      if (["Enter", " "].includes(e.key)) {
        e.preventDefault();
        toggleAccordion(button, content);
      }
    });
  });
}

function toggleAccordion(button, content) {
  const isOpen = content.classList.contains("open");

  // Close all open items
  document.querySelectorAll(".accordion-content.open").forEach((el) => {
    el.classList.remove("open");
    const prevBtn = el.previousElementSibling;
    if (prevBtn?.classList.contains("accordion-toggle")) {
      prevBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Open current if not already open
  if (!isOpen) {
    content.classList.add("open");
    button.setAttribute("aria-expanded", "true");
  }
}

// ========== DARK MODE ==========
function initDarkMode() {
  const toggle = document.getElementById("darkToggle");
  if (!toggle) return;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");

  document.body.classList.toggle("dark-mode", savedTheme === "dark");
  toggle.setAttribute("aria-pressed", savedTheme === "dark");
  toggle.setAttribute("role", "button");
  toggle.setAttribute("tabindex", "0");

  function updateTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggle.setAttribute("aria-pressed", isDark);
  }

  toggle.addEventListener("click", updateTheme);
  toggle.addEventListener("keydown", (e) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
      updateTheme();
    }
  });
}

// ========== SCROLL TO TOP ==========
function initScrollToTop() {
  const scrollBtn = document.getElementById("scrollTop");
  if (!scrollBtn) return;

  scrollBtn.style.display = "none";
  scrollBtn.setAttribute("tabindex", "0");
  scrollBtn.setAttribute("role", "button");
  scrollBtn.setAttribute("aria-label", "Scroll to top");

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  }, { passive: true });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  scrollBtn.addEventListener("keydown", (e) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

// ========== SCROLL REVEAL ==========
function initRevealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || "0s";
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}
