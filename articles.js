document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const mdFile = params.get("file");
  const loadingEl = document.getElementById("loading");
  const container = document.getElementById("articleContainer");

  if (!mdFile) {
    loadingEl.innerHTML = "<p>Erreur : aucun article spécifié.</p>";
    return;
  }

  fetch(`/data/${mdFile}`)
    .then(res => {
      if (!res.ok) throw new Error("Fichier introuvable");
      return res.text();
    })
    .then(mdText => {
      // parse markdown and show it
      container.innerHTML = marked.parse(mdText);
      loadingEl.style.display = "none";
      container.style.display = "block";
    })
    .catch(err => {
      console.error(err);
      loadingEl.innerHTML = "<p>Impossible de charger l’article.</p>";
    });
});
