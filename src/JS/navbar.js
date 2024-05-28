      // Carregar a barra de navegação dinamicamente
      document.addEventListener("DOMContentLoaded", function() {
        // Fetch para carregar o conteúdo da navbar.html
        fetch('navbar.html')
          .then(response => response.text())
          .then(data => {
            // Inserir o conteúdo da barra de navegação na div navbar-container
            document.getElementById("navbar-container").innerHTML = data;
          })
          .catch(error => {
            console.log("Erro ao carregar a barra de navegação:", error);
          });
      });