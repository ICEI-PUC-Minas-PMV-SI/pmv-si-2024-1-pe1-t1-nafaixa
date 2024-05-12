// Função para formatar a data
function formatarData(data) {
  const partes = data.split('/');

  if (partes.length !== 3) {
    console.error('Formato de data inválido:', data);
    return null;
  }

  const dia = parseInt(partes[0], 10);
  const mesNumero = parseInt(partes[1], 10);
  const ano = parseInt(partes[2], 10);

  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  const mesNome = meses[mesNumero - 1];

  return `${dia} de ${mesNome} de ${ano}`;
}

// Função para formatar a hora
function formatarHora(hora) {
  const partes = hora.split(':');

  if (partes.length !== 2) {
    console.error('Formato de hora inválido:', hora);
    return null;
  }

  const horas = parseInt(partes[0], 10);
  const minutos = parseInt(partes[1], 10);
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}

// Função para formatar data e hora juntas
function formatarDataHora(data, hora) {
  const dataFormatada = formatarData(data);
  const horaFormatada = formatarHora(hora);

  if (!dataFormatada || !horaFormatada) {
    return null;
  }

  return `${dataFormatada} às ${horaFormatada}`;
}

//Paginação
document.addEventListener('DOMContentLoaded', () => {
  let eventosExibidosId1 = 0;
  let eventosExibidosId2 = 0;
  const eventosPorVez = 4;

  async function obterEventosEExibirCards(id, url, limit) {
    try {
      const response = await fetch(url);
      const eventos = await response.json();

      const wrapperElement = document.getElementById(id);

      if (id === 'eventosFiltrados') {
        // Obter a palavra-chave de localização do localStorage
        const userLocation = localStorage.getItem('userLocation');

        eventos.slice(eventosExibidosId1, eventosExibidosId1 + limit).forEach(evento => {
          // Verificar se o evento corresponde à palavra-chave da localização do usuário
          if (userLocation && evento.local.toLowerCase().includes(userLocation.toLowerCase())) {
            const cardElement = criarCardEvento(evento);
            wrapperElement.appendChild(cardElement);
          }
        });

        eventosExibidosId1 += limit;

        // Verificar se todos os eventos foram exibidos para o id=1
        if (eventosExibidosId1 >= eventos.length) {
          const mostrarMaisBtn = document.querySelector('.mostrarMais');
          if (mostrarMaisBtn) {
            mostrarMaisBtn.style.display = 'none';
          }
        }
      } else if (id === 'todosEventos') {
        eventos.slice(eventosExibidosId2, eventosExibidosId2 + limit).forEach(evento => {
          const cardElement = criarCardEvento(evento);
          wrapperElement.appendChild(cardElement);
        });

        eventosExibidosId2 += limit;

        // Verificar se todos os eventos foram exibidos para o id=2
        if (eventosExibidosId2 >= eventos.length) {
          const mostrarMaisBtn = document.querySelector('.mostrarMais');
          if (mostrarMaisBtn) {
            mostrarMaisBtn.style.display = 'none';
          }
        }
      }

    } catch (error) {
      console.error('Erro ao obter os eventos:', error);
    }
  }

  // Função para criar o card de um evento
  function criarCardEvento(evento) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('cards');
    cardElement.dataset.id = evento.id;

    const dataHoraFormatada = formatarDataHora(evento.startDate, evento.startTime);

    // Verifica se o evento é presencial ou online
    if (evento.tipo === 'presencial') {
      cardElement.innerHTML = `
        <img class="banner-card" src="${evento.bannerURL}" alt="banner do evento" />
        <p class="event-title">${evento.nome}</p>
        <p><img src="./assets/img/data.svg" alt="Data e Horário do evento" />${dataHoraFormatada}</p>
        <p><img src="./assets/img/local.svg" alt="Local do evento" />${evento.local}</p>
      `;
    } else if (evento.tipo === 'online') {
      cardElement.innerHTML = `
        <img class="banner-card" src="${evento.bannerURL}" alt="banner do evento" />
        <p class="event-title">${evento.nome}</p>
        <p><img src="./assets/img/data.svg" alt="Data e Horário do evento" />${dataHoraFormatada}</p>
        <p><img src="./assets/img/local.svg" alt="Local do evento" />${evento.link}</p>
      `;
    } else {
      console.error('Tipo de evento desconhecido:', evento.tipo);
      return null;
    }

    cardElement.addEventListener('click', () => {
      window.location.href = `detalhes-evento.html?id=${evento.id}`;
    });

    return cardElement;
  }

  // Inicializar o carregamento dos eventos com ID '1' e '2'
  obterEventosEExibirCards('eventosFiltrados', 'http://localhost:3000/eventos', eventosPorVez);
  obterEventosEExibirCards('todosEventos', 'http://localhost:3000/eventos', eventosPorVez);

  // Listener para o botão "Mostrar Mais" do ID '2'
  const mostrarMaisBtn = document.querySelector('.mostrarMais');
  if (mostrarMaisBtn) {
    mostrarMaisBtn.addEventListener('click', () => {
      obterEventosEExibirCards('todosEventos', 'http://localhost:3000/eventos', eventosPorVez);
    });
  }
});


