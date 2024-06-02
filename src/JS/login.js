const entrar = document.getElementById("botaoEntrar");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

entrar.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordMD5 = hashSenha(password);

  function hashSenha(senha) {
    return CryptoJS.MD5(senha).toString();
  }

  try {
    const response = await fetch("http://localhost:3000/produtor");
    const produtores = await response.json();

    const produtor = produtores.find(
      (produtor) => produtor.email === email && produtor.senha === passwordMD5
    );

    if (produtor) {
      localStorage.setItem("userData", JSON.stringify({ id: produtor.id })); ;
      window.location.href = "meus-eventos.html";
    } else {
      alert("Dados inseridos inválidos!");
      return false;
    }
  } catch (error) {
    console.error("Erro ao buscar dados do JSON-server:", error);
    alert("Erro ao buscar dados do servidor JSON.");
  }
});


function updateNavbar() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navbarLoggedOut = document.getElementsById('navbar-logged-out');
  const navbarLoggedIn = document.getElementById('navbar-logged-in');

  if (userData && userData.id) {
      navbarLoggedOut.style.display = 'none';
      navbarLoggedIn.style.display = 'block';
  } else {
      navbarLoggedOut.style.display = 'block';
      navbarLoggedIn.style.display = 'none';
  }
}


updateNavbar();

