document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");
  let articles = [];

  // Load all articles once
  fetch("/data/articles.json")
    .then(res => res.json())
    .then(data => {
      articles = data;
      renderResults(articles); // show them all initially, or you can leave this out
    })
    .catch(err => console.error("Failed to load articles.json:", err));

  // Live‐filter as the user types
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (q === "") {
      // If the search box is empty, clear the grid (or show all articles)
      resultsContainer.innerHTML = "";
      return;
    }

    const filtered = articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q)
    );
    renderResults(filtered, q);
  });

  function renderResults(list, query = "") {
    resultsContainer.innerHTML = "";

    if (list.length === 0 && query !== "") {
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
