<!-- script.js -->
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to Our Journey Today!");
  // More interactivity can be added here
});

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const menu  = document.getElementById('navMenu');

  // Toggle open/close on click
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Close menu when the mouse leaves its area
  menu.addEventListener('mouseleave', () => {
    menu.classList.remove('open');
  });

  // Close menu when the user scrolls
  window.addEventListener('scroll', () => {
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
    }
  });
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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('storyForm');
  const FORMSPREE_URL = 'https://formspree.io/f/xrbapzyz'; // <- replace

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name  = document.getElementById('name').value.trim();
    const title = document.getElementById('title').value.trim();
    const story = document.getElementById('story').value.trim();
    const email = document.getElementById('email').value.trim();

    // Build a condensed message (short readable text)
    const condensed = [
      `Title: ${title}`,
      `Name: ${name || 'Anonymous'}`,
      `Email: ${email || 'N/A'}`,
      '',
      `Story:`,
      story.length > 800 ? story.slice(0, 800) + '…' : story // short preview + full story included in a separate field if desired
    ].join('\n');

    // Payload for Formspree. You can include _subject to set email subject.
    const payload = {
      _subject: `New Story: ${title}`,
      name,
      email,
      title,
      message: condensed
    };

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        // success UI — redirect or show message
        alert('Merci — story submitted! We will read it and get back to you if needed.');
        form.reset();
        // optionally redirect to a success page:
        // window.location.href = 'submit-success.html';
      } else {
        // Formspree returns errors in JSON
        throw new Error((data && data.error) || 'Failed to send');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Sorry — problème lors de l’envoi. Réessaye plus tard.');
    }
  });
});



