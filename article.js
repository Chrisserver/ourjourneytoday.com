document.addEventListener("DOMContentLoaded", () => {
  const params      = new URLSearchParams(window.location.search);
  const mdFile      = params.get("file") || "a1.md";
  const loadingEl   = document.getElementById("loading");
  const containerEl = document.getElementById("articleContainer");

  if (!mdFile) {
    loadingEl.textContent = "Erreur : aucun article spécifié.";
    return;
  }

  fetch(`/data/${mdFile}`)
    .then(res => {
      if (!res.ok) throw new Error("Fichier introuvable");
      return res.text();
    })
    .then(mdText => {
      // 1) Parse & inject the article
      containerEl.innerHTML = marked.parse(mdText);
      containerEl.style.display = "block";

      // 2) Remove the loader from the DOM entirely
      loadingEl.remove();
    })
    .catch(err => {
      console.error(err);
      loadingEl.textContent = "Impossible de charger l’article.";
    });
});
