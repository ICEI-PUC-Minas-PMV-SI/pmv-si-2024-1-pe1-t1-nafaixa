function esconderMapa() {
  const map = document.getElementById("map");
  map.style.display = "none";
  document.getElementById("esconderMapaTexto").innerText = "Mostrar mapa";
}
function aparecerMapa() {
  const map = document.getElementById("map");
  map.style.display = "";
  document.getElementById("esconderMapaTexto").innerText = "Esconder mapa";
}
function esconderOuAparecerMapa() {
  console.log("escondendo ou aparecendo");
  const map = document.getElementById("map");
  const estaAparecendo = !(map.style.display == "none");
  if (estaAparecendo) {
    esconderMapa();
  } else {
    aparecerMapa();
  }
}
function adicionarListnerButton() {
  console.log("adicionando listener");
  document
    .getElementById("esconderMapa-button")
    .addEventListener("click", esconderOuAparecerMapa);
}
window.onload = adicionarListnerButton;
