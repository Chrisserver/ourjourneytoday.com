document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");
  let articles = [];

  // 1. Load your JSON file
  fetch("/data/articles.json")
    .then(res => res.json())
    .then(data => {
      articles = data;
      renderResults(articles);
    })
    .catch(err => console.error("Failed to load articles.json:", err));

  // 2. Live-filter as the user types
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const filtered = articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q)
    );
    renderResults(filtered);
  });

  // 3. Render a list of article-cards into the container
  function renderResults(list) {
    resultsContainer.innerHTML = "";
    if (list.length === 0) {
      resultsContainer.innerHTML = "<p>No articles found.</p>";
      return;
    }

    list.forEach(article => {
      const card = document.createElement("div");
      card.className = "article-card";
      card.innerHTML = `
        <h3><a href="${article.link}">${article.title}</a></h3>
        <p>${article.summary}</p>
        <small>${article.date}</small>
      `;
      resultsContainer.appendChild(card);
    });
  }
});
