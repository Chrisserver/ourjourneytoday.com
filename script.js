<!-- script.js -->
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to Our Journey Today!");
  // More interactivity can be added here
});

/*
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
*/

function searchArticles() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  console.log("Searching for:", query);
  alert(`Search for: ${query} (functionality coming soon)`);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('articles.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const articleId = params.get('id');

      if (path.endsWith("index.html") || path === "/") {
        // 3 articles « à la une » sur la page d’accueil
        const featured = data.slice(0, 3);
        renderArticles(featured, "featuredGrid");
      }

      if (path.endsWith("teachings.html")) {
        // Tous les articles sur la page “Teachings”
        renderArticles(data, "articlesGrid");
      }

      if (path.endsWith("article.html") && articleId) {
        const article = data.find(a => a.id === articleId);
        renderArticleDetail(article);
      }
    })
    .catch(error => console.error("Erreur de chargement :", error));
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

function renderArticleDetail(article) {
  if (!article) {
    document.body.innerHTML = "<p>Article non trouvé.</p>";
    return;
  }
  const main = document.querySelector("main");
  main.innerHTML = `
    <article>
      <h1>${article.title}</h1>
      <p><em>Publié le ${article.date}</em></p>
      <div id="articleContent"></div>
    </article>
  `;
  // charger le contenu Markdown depuis un fichier .md (optionnel)
  fetch(`data/${article.id}.md`)
    .then(r => r.text())
    .then(md => {
      // marked.js convertit Markdown → HTML  
      document.getElementById("articleContent").innerHTML = marked.parse(md);
    })
    .catch(() => {
      document.getElementById("articleContent")
              .innerHTML = "<p>Contenu indisponible.</p>";
    });
}

