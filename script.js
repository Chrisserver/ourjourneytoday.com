<!-- script.js -->
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to Our Journey Today!");
  // More interactivity can be added here
});

// Toggle menu on small screens
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
  });
});
