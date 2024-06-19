let eventos = [];

document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get('categoria');

  fetchCategorias().then(() => {
    if (categoria) {
      changePageTitle(categoria);
      searchCategory(categoria);
    }
  });

  const selectSort = document.querySelector("select[name='ordenacao']");
  if (selectSort) {
    selectSort.value = "";
    selectSort.addEventListener("change", onChangeSort);
  }
});

function fetchCategorias() {
  return fetch('http://localhost:3000/categorias')
    .then(response => response.json())
    .then(categorias => {
      populateCategorySelect(categorias);
    })
    .catch(error => {
      console.error("Erro ao carregar categorias:", error);
    });
}

function populateCategorySelect(categorias) {
  const selectCategories = document.querySelector("select[name='categorias']");
  if (selectCategories) {
    selectCategories.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Categoria';
    selectCategories.appendChild(defaultOption);

    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.nome;
      option.textContent = categoria.nome;
      selectCategories.appendChild(option);
    });

    selectCategories.addEventListener("change", onChangeCategory);
  }
}


function searchCategory(category) {
  if (category) {
    const apiUrl = `http://localhost:3000/eventos?categoria=${category}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(events => {
        eventos = events.filter(evento => isDataFuturaOuHoje(evento.finalDate));
        console.log("Eventos carregados para categoria:", category, eventos);
        populateEvents();
      })
      .catch(error => {
        console.error("Erro ao carregar categoria:", error);
      });
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function changePageTitle(category) {
  const pageTitleElem = document.getElementById('categoria-titulo');
  if (pageTitleElem) {
    pageTitleElem.textContent = capitalizeFirstLetter(category);
  }
}

function onChangeCategory(e) {
  const category = e.target.value;
  changePageTitle(category);
  searchCategory(category);

  // Atualiza o parâmetro da URL sem recarregar a página
  const newUrl = `${window.location.pathname}?categoria=${category}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
}

function onChangeSort(e) {
  const sort = e.target.value;
  if (sort === "date") {
    eventos.sort((a, b) => new Date(converterParaData(a.startDate)) - new Date(converterParaData(b.startDate)));
  } else if (sort === "name-asc") {
    eventos.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (sort === "name-desc") {
    eventos.sort((a, b) => b.nome.localeCompare(a.nome));
  }
  populateEvents();
}

function populateEvents() {
  const divContainerCards = document.querySelector("div.wrapper-cards");
  if (divContainerCards) {
    divContainerCards.innerHTML = "";

    if (eventos.length === 0) {
      divContainerCards.innerHTML = '<p class="no-events-message">Não existe eventos para a categoria selecionada.</p>';
      return;
    }

    eventos.forEach(evento => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('cards');
      cardElement.dataset.id = evento.id;

      const dataHoraFormatada = formatarDataHora(evento.startDate, evento.startTime);

      let detalheExtra = "";

      if (evento.tipo === "presencial") {
        const local = evento.nomeLocal ? evento.nomeLocal : evento.local;

        detalheExtra = `<p><img src="./assets/img/local.svg" alt="Local do evento" />${local}</p>`;
      } else if (evento.tipo === "online") {
        detalheExtra = `<p><img src="./assets/img/local.svg" alt="Link do evento" />${evento.link}</p>`;
      } else {
        console.error("Tipo de evento desconhecido:", evento.tipo);
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
}


function converterParaData(data) {
  const partes = data.split("/");
  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const ano = parseInt(partes[2], 10);
  return new Date(ano, mes, dia);
}

function isDataFuturaOuHoje(dataEvento) {
  const hoje = new Date();
  const dataConvertida = converterParaData(dataEvento);
  return dataConvertida >= hoje.setHours(0, 0, 0, 0);
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
