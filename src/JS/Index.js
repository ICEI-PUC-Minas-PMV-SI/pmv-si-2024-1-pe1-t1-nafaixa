// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM is ready!");

//   document.querySelectorAll("article.categories-cards").forEach((article) => {
//     article.addEventListener("click", handleClick);
//   });
// });

// function handleClick(e) {
//   console.log("clicked", e.target.id);
//   window.location.href = `eventos-categorias.html?categoria=${e.target.id}`;
// }




document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.categories-cards');

  cards.forEach(card => {
    card.addEventListener('click', function () {
      const categoria = card.querySelector('h3').textContent;

      window.location.href = `eventos-categorias.html?categoria=${encodeURIComponent(categoria)}`;
    });
  });
});