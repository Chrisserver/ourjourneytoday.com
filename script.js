<!-- script.js -->
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to Our Journey Today!");
  // More interactivity can be added here
});

<script>
  const toggle = document.getElementById("menuToggle");
  const navList = document.querySelector("nav ul");

  toggle.addEventListener("click", () => {
    navList.classList.toggle("active");
  });
</script>

function searchArticles() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  console.log("Searching for:", query);
  alert(`Search for: ${query} (functionality coming soon)`);
}
