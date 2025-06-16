<!-- script.js -->
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to Our Journey Today!");
  // More interactivity can be added here
});

// Toggle menu on small screens

//document.addEventListener('DOMContentLoaded', function () {
//  const toggle = document.getElementById('menuToggle');
//  const menu = document.getElementById('navMenu');
//
//  toggle.addEventListener('click', function () {
//    menu.classList.toggle('open');
//  });
//});

<script>
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navMenu');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
</script>

function searchArticles() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  console.log("Searching for:", query);
  alert(`Search for: ${query} (functionality coming soon)`);
}
