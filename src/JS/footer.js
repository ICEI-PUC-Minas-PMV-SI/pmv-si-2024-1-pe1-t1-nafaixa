// footer.js

document.addEventListener('DOMContentLoaded', function() {
  const footerContainer = document.getElementById('footer-container');

  // Criar uma requisição HTTP para carregar o conteúdo do footer.html
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'footer.html', true);

  xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
          // Se a requisição for bem-sucedida, inserir o conteúdo do footer no footerContainer
          footerContainer.innerHTML = xhr.responseText;
      } else {
          console.error('Erro ao carregar o footer:', xhr.statusText);
      }
  };

  xhr.onerror = function() {
      console.error('Erro de conexão ao carregar o footer.');
  };

  // Enviar a requisição
  xhr.send();
});
