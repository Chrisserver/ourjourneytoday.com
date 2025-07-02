document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");
  let articles = [];

  fetch("/data/articles.json")
    .then(res => res.json())
    .then(data => {
      articles = data;
    })
    .catch(err => console.error("Failed to load articles:", err));

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();

    // 1) Clear if empty
    if (!q) {
      resultsContainer.innerHTML = "";
      return;
    }

    // 2) Filter
    const filtered = articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      (a.summary && a.summary.toLowerCase().includes(q))
    );

    // 3) Render or “no matches”
    if (filtered.length === 0) {
      resultsContainer.innerHTML = "<p>No articles found.</p>";
    } else {
      resultsContainer.innerHTML = "";            // clear first
      filtered.forEach(a => {
        const card = document.createElement("div");
        card.className = "article-card";
        card.innerHTML = `
          <h3><a href="${a.link}">${a.title}</a></h3>
          <p>${a.summary}</p>
          <small>${a.date}</small>
        `;
        resultsContainer.appendChild(card);
      });
    }
  });
});
