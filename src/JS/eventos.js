let eventos = [];

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready todos eventos!");

  const selectSort = document.querySelector("select[name='ordenacao']");
  selectSort.value = "";
  selectSort.addEventListener("change", onChangeSort);

  searchEvents();
});

function searchEvents() {
  const apiUrl = `http://localhost:3000/eventos`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((events) => {
      eventos = events;
      console.log("GOKU eventos", eventos);
      populateEvents();
    })
    .catch((error) => {
      console.error("Erro ao carregar todos eventos:", error);
    });
}

function populateEvents() {
  const divContainerCards = document.querySelector("div.wrapper-cards");
  divContainerCards.innerHTML = "";

  //   removePastEvents();

  eventos.forEach((evento) => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
              <div class="cards" id="${evento.id}" onclick="onClickEventCard('${
      evento.id
    }')">
                    <img
                      class="imgcard"
                      src=${evento.bannerURL || ""}
                      alt="event img"
                    />
                    <p class="event-title">${evento.nome}</p>
                    <p><img src="./assets/img/data.svg" alt="Data do evento" />${
                      evento.startDate
                    }</p>
                    <p>
                      <img src="./assets/img/local.svg" alt="Local do evento" />${
                        evento.local
                      }
                    </p>
                  </div>
              `;
    divContainerCards.appendChild(card);
  });
}

function onChangeSort(e) {
  const sort = e.target.value;
  console.log("sort", sort);
  if (sort === "date") {
    eventos.sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    });
  } else if (sort === "name-asc") {
    eventos.sort((a, b) => {
      return a.nome?.localeCompare(b.nome);
    });
  } else if (sort === "name-desc") {
    eventos.sort((a, b) => {
      return b.nome?.localeCompare(a.nome);
    });
  }

  populateEvents();
}

function removePastEvents() {
  const today = new Date();
  eventos = eventos.filter((evento) => {
    return new Date(evento.startDate) >= today;
  });
}

function onClickEventCard(id) {
  window.location.href = `detalhes-evento.html?id=${id}`;
}