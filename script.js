<!-- script.js -->
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to Our Journey Today!");
  // More interactivity can be added here
});

document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
  });
});

function searchArticles() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  console.log("Searching for:", query);
  alert(`Search for: ${query} (functionality coming soon)`);
}
