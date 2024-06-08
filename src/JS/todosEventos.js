document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM is ready!");

const apiUrl = `http://localhost:3000/eventos`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((eventos) => {
        const divContainerCards = document.getElementById("cards-container");

        eventos.forEach((evento) => {
          const card = document.createElement("article");
          card.classList.add("card");
          card.innerHTML = `
            <div class="cards">
                  <img
                    class="imgcard"
                    src=${evento.imagem}
                    alt="event img"
                  />
                  <p class="event-title">${evento.nome}</p>
                  <p><img src="./assets/img/data.svg" alt="Data do evento" />${evento.startDate}</p>
                  <p>
                    <img src="./assets/img/local.svg" alt="Local do evento" />${evento.local}
                  </p>
                </div>
            `;
          divContainerCards.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar categoria:", error);
      });
    });