      // Carregar a barra de navegação dinamicamente
      document.addEventListener("DOMContentLoaded", function() {
        fetch('navbar.html')
          .then(response => response.text())
          .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
          })
          .catch(error => {
            console.log("Erro ao carregar a barra de navegação:", error);
          });
      });

