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
      const container = document.getElementById("articlesList");
      data.forEach(article => {
        const articleHTML = `
          <div class="article">
            <h3><a href="${article.link}">${article.title}</a></h3>
            <p>${article.summary}</p>
            <small>${article.date}</small>
          </div>
        `;
        container.innerHTML += articleHTML;
      });
    })
    .catch(error => console.error("Error loading articles:", error));
});
