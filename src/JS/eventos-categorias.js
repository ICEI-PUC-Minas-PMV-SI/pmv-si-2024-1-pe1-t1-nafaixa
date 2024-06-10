let eventos = [];

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("categoria");
  console.log("DOM is ready eventos!", category);

  changePageTitle(category);

  const selectCategories = document.querySelector("select[name='categorias']");
  selectCategories.value = category;
  selectCategories.addEventListener("change", onChangeCategory);

  const selectSort = document.querySelector("select[name='ordenacao']");
  selectSort.value = "";
  selectSort.addEventListener("change", onChangeSort);

  searchCategory(category);
});

function searchCategory(category) {
  if (category) {
    const apiUrl = `http://localhost:3000/eventos?categoria=${category}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((events) => {
        eventos = events;
        console.log("QLQR evento", eventos);
        populateEvents();
      })
      .catch((error) => {
        console.error("Erro ao carregar categoria:", error);
      });
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function changePageTitle(category) {
  const pageTitleElem = document.querySelector("div.todos-eventos-title h1");
  pageTitleElem.innerText = capitalizeFirstLetter(category);
}

function onClickEventCard(id) {
  window.location.href = `detalhes-evento.html?id=${id}`;
}

function onChangeCategory(e) {
  const category = e.target.value;
  changePageTitle(category);
  searchCategory(category);
}












function onChangeSort(e) {
  const sort = e.target.value;
  console.log("sort", sort);
  if (sort === "date") {
    eventos.sort((a, b) => {

      return new Date(b.startDate) - new Date(a.finalDate);
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

function populateEvents() {
  const divContainerCards = document.querySelector("div.wrapper-cards");
  divContainerCards.innerHTML = "";


  // removePastEvents();

  eventos.forEach((evento) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('cards');
    cardElement.dataset.id = evento.id;

    const dataHoraFormatada = formatarDataHora(evento.startDate, evento.startTime);

    let detalheExtra = '';
    if (evento.tipo === 'presencial') {
      detalheExtra = `<p><img src="./assets/img/local.svg" alt="Local do evento" />${evento.local}</p>`;
    } else if (evento.tipo === 'online') {
      detalheExtra = `<p><img src="./assets/img/local.svg" alt="Link do evento" />${evento.link}</p>`;
    } else {
      console.error('Tipo de evento desconhecido:', evento.tipo);
      return null;
    }

    cardElement.innerHTML = `
            <img class="banner-card" src="${evento.bannerURL}" alt="banner do evento" />
            <p class="event-title">${evento.nome}</p>
            <p><img src="./assets/img/data.svg" alt="Data e Horário do evento" />${dataHoraFormatada}</p>
            ${detalheExtra}
        `;

    cardElement.addEventListener('click', () => {
      window.location.href = `detalhes-evento.html?id=${evento.id}`;
    });
    divContainerCards.appendChild(cardElement);
  });
}

function formatarDataHora(startDate, startTime) {
  return `${startDate} ${startTime}`;
}


function removePastEvents() {
  const today = new Date();
  console.log(today)
  eventos = eventos.filter((evento) => {
    return new Date(evento.finalDate) >= today;
  });
}
