function esconderMapa() {
  const map = document.getElementById("map");
  map.style.display = "none";
  document.getElementById("esconderMapaTexto").innerText = "Aparecer Mapa";
}
function aparecerMapa() {
  const map = document.getElementById("map");
  map.style.display = "";
  document.getElementById("esconderMapaTexto").innerText = "Esconder Mapa";
}
function esconderOuAparecerMapa() {
  const map = document.getElementById("map");
  const estaAparecendo = !(map.style.display == "none");
  if (estaAparecendo) {
    esconderMapa();
  } else {
    aparecerMapa();
  }
}
function adicionarListnerButton() {
  document
    .getElementById("esconderMapa-button")
    .addEventListener("click", esconderOuAparecerMapa);
}
window.onload = adicionarListnerButton;
