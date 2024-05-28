const entrar = document.getElementById('botaoEntrar');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

entrar.addEventListener('click', function(event) {
  event.preventDefault();

const email = emailInput.value;
const password = passwordInput.value;

    
let userFound = false;

    
for (let i = 0; i < localStorage.length; i++) {
const key = localStorage.key(i);
if (key.startsWith('userData-')) { 
    
const userDataString = localStorage.getItem(key);
const userData = JSON.parse(userDataString);
if (userData.email === email) {
    
if (password === userData.password) {
    
    window.location.href = 'meus-eventos.html';
    userFound = true;
    break;
      } else {
        alert('Dados inseridos inválidos!');
        userFound = true;
        break;
      }
    }
  }
}


if (!userFound) {
  alert('Não há nenhum usuário cadastrado com esse email');
}
});
