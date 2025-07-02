document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const mdFile = params.get("file");
  const loadingEl = document.getElementById("loading");
  const containerEl = document.getElementById("articleContainer");

  if (!mdFile) {
    loadingEl.textContent = "Erreur : aucun article spécifié.";
    return;
  }

  fetch(`/data/${mdFile}`)
    .then(res => {
      if (!res.ok) throw new Error("Fichier introuvable");
      return res.text();
    })
    .then(mdText => {
      // extraire le front matter
      const regex = /^---\s*([\s\S]*?)\s*---\s*/;
      const match = mdText.match(regex);

      let metadata = {};
      let content = mdText;

      if (match) {
        try {
          metadata = jsyaml.load(match[1]);
          content = mdText.slice(match[0].length);
        } catch (e) {
          console.error("Erreur YAML:", e);
        }
      }

      // injecter le contenu markdown
      containerEl.innerHTML = marked.parse(content);

      // en option : ajouter un bloc titre/dates au-dessus
      if (metadata.title) {
        const titleEl = document.createElement("h1");
        titleEl.textContent = metadata.title;
        containerEl.prepend(titleEl);
      }
      if (metadata.date || metadata.author) {
        const metaEl = document.createElement("p");
        metaEl.className = "article-meta";
        metaEl.textContent = `${metadata.date || ""} ${metadata.author ? "– " + metadata.author : ""}`;
        containerEl.prepend(metaEl);
      }

      containerEl.style.display = "block";
      loadingEl.remove();
    })
    .catch(err => {
      console.error(err);
      loadingEl.textContent = "Impossible de charger l’article.";
    });
});
