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




/* 




// Função para converter string "DD MM YYYY" para objeto Date
function converterParaData(data) {
  if (!data) {
    console.error("Data inválida:", data);
    return null;
  }

  const partes = data.split("/");
  if (partes.length !== 3) {
    console.error("Formato de data inválido:", data);
    return null;
  }

  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const ano = parseInt(partes[2], 10);
  console.log(dia, mes, ano)

  return new Date(ano, mes, dia);
}

function isDataFuturaOuHoje(dataEvento) {
  if (!dataEvento) {
    console.error("Data do evento inválida:", dataEvento);
    return false;
  }
  const hoje = new Date();
  const dataConvertida = converterParaData(dataEvento);
  if (!dataConvertida) {
    console.error("Erro ao converter data:", dataEvento);
    return false;
  }
  return dataConvertida >= hoje.setHours(0, 0, 0, 0); // Comparar com o início do dia de hoje
}

function estaEmEventosProximos() {
  return window.location.href.includes("Proximo");
}


 */







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





//Função para converter string "DD MM YYYY" para objeto Date

converterParaData();
function converterParaData(data) {
  if (!data) {
    console.error("Data inválida:", data);
    return null;
  }

  const partes = data.split("/");
  if (partes.length !== 3) {
    console.error("Formato de data inválido:", data);
    return null;
  }

  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const ano = parseInt(partes[2], 10);
  console.log(dia, mes, ano)

  

  return new Date(ano, mes, dia);
  
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
                      evento.finalDate
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


function removePastEvents() {
  const today = new Date();
  console.log(today)
  eventos = eventos.filter((evento) => {
    return new Date(evento.finalDate) >= today;
  });
}
