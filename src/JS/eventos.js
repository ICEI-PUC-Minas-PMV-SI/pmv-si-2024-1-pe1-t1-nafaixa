// Função para converter string "DD/MM/YYYY" para objeto Date
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
  return dataConvertida >= hoje.setHours(0, 0, 0, 0);
}

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
      eventos = events.filter(evento => isDataFuturaOuHoje(evento.finalDate));
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
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const partesData = startDate.split("/");
  const dia = partesData[0];
  const mes = meses[parseInt(partesData[1], 10) - 1];
  const ano = partesData[2];
  const dataFormatada = `${dia.padStart(2, '0')} de ${mes} de ${ano}`;
  return `${dataFormatada} às ${startTime}`;
}

function onChangeSort(e) {
  const sort = e.target.value;
  if (sort === "date") {
    eventos.sort((a, b) => {
      const dateA = converterParaData(a.startDate);
      const dateB = converterParaData(b.startDate);
      return dateA - dateB;
    });
  } else if (sort === "name-asc") {
    eventos.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (sort === "name-desc") {
    eventos.sort((a, b) => b.nome.localeCompare(a.nome));
  }

  populateEvents();
}

function removePastEvents() {
  const today = new Date();
  eventos = eventos.filter((evento) => {
    return new Date(converterParaData(evento.finalDate)) >= today.setHours(0, 0, 0, 0);
  });
}

function onClickEventCard(id) {
  window.location.href = `detalhes-evento.html?id=${id}`;
}
