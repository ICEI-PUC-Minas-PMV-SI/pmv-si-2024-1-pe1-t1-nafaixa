const sair = document.getElementById("botaoSair");

sair.addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.removeItem("userData");

    window.location.href = "login.html";
});