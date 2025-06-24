// Future enhancements like form validation, animations, etc.
// Example:
console.log("Welcome to Aakash Verma's data service site!");

// Accordion Toggle Script
document.querySelectorAll('.accordion-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;

    button.classList.toggle('active');
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});
