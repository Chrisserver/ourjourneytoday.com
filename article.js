document.addEventListener("DOMContentLoaded", () => {
  // 1. Figure out which file to load, e.g. via URL param ?file=article1.md
  const params = new URLSearchParams(window.location.search);
  const mdFile = params.get("file") || "a1.md"; 
  const mdPath = `data/${mdFile}`;

  fetch(mdPath)
    .catch(err => {
      console.error(err);
      document.querySelector(".article-content").innerHTML =
        "<p>Imp</p>";
    });

  // 2. Fetch the markdown file
  fetch(mdPath)
    .then(res => {
      if (!res.ok) throw new Error("Cannot load " + mdPath);
      return res.text();
    })
    .then(mdText => {
      // 3. Convert markdown to HTML
      const html = marked.parse(mdText);
      document.querySelector(".article-content").innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      document.querySelector(".article-content").innerHTML =
        "<p>Sorry, we couldn't load that article.</p>";
    });
});
