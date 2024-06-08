document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready!");

  document.querySelectorAll("article.categories-cards").forEach((article) => {
    article.addEventListener("click", handleClick);
  });
});

function handleClick(e) {
  console.log("clicked", e.target.id);
  window.location.href = `eventos-categorias.html?categoria=${e.target.id}`;
}
