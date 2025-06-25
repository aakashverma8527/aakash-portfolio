// script.js – Enhanced JS for Interactive Portfolio

console.log("Welcome to Aakash Verma's data service site!");

// 🔁 On DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initAccordion();
  initDarkMode();
  initScrollToTop();
  initRevealOnScroll();
});

// ✅ Accordion Toggle with Animation and Accessibility
function initAccordion() {
  document.querySelectorAll(".accordion-toggle").forEach((button) => {
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isOpen = content.classList.contains("open");

      // Close all open accordions
      document.querySelectorAll(".accordion-content.open").forEach((el) => {
        el.classList.remove("open");
        el.previousElementSibling.setAttribute("aria-expanded", "false");
      });

      // Toggle current accordion
      if (!isOpen) {
        content.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      } else {
        content.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// 🌙 Dark Mode Toggle
function initDarkMode() {
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "🌓 Toggle Theme";
  toggleBtn.className = "dark-toggle btn-secondary";
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

// 🆙 Scroll-to-Top Button
function initScrollToTop() {
  const btn = document.createElement("button");
  btn.innerHTML = "⬆";
  btn.className = "scroll-top";
  btn.style.display = "none";
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 🔍 Reveal Sections on Scroll
function initRevealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
}

// 💡 Future Setup
// addFormValidation();
// splitIntoModules();
