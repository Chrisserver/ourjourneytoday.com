<!-- script.js -->
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to Our Journey Today!");
  // More interactivity can be added here
});

document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');

  if (!toggle || !menu) {
    console.error('Toggle or menu not found');
    return;
  }

  toggle.addEventListener('click', function () {
    console.log("Hamburger clicked");
    menu.classList.toggle('open');
  });
});

function searchArticles() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  console.log("Searching for:", query);
  alert(`Search for: ${query} (functionality coming soon)`);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('articles.json')
    .then(response => response.json())
    .then(data => {
      const path = window.location.pathname;

      if (path.includes("index.html") || path === "/") {
        // Show 3 featured articles on homepage
        const featured = data.slice(0, 3); // You could also filter by tags like "featured"
        renderArticles(featured, "featuredGrid");
      }

      if (path.includes("teachings.html")) {
        // Show all articles on the Teachings page
        renderArticles(data, "articlesGrid");
      }
    })
    .catch(error => console.error("Error loading articles:", error));
});

function renderArticles(articles, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "article-card";
    card.innerHTML = `
      <h3><a href="${article.link}">${article.title}</a></h3>
      <p>${article.summary}</p>
      <small>${article.date}</small>
    `;
    container.appendChild(card);
  });
}
