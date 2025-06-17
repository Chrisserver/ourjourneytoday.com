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
      const grid = document.getElementById("articlesGrid");
      data.forEach(article => {
        const card = document.createElement("div");
        card.className = "article-card";
        card.innerHTML = `
          <h3><a href="${article.link}">${article.title}</a></h3>
          <p>${article.summary}</p>
          <small>${article.date}</small>
        `;
        grid.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading articles:", error));
});
