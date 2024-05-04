//Função para formatar a data e hora
function formatarDataHora(data) {
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


// 

document.addEventListener('DOMContentLoaded', () => {
  let eventosExibidos = 0;
  const eventosPorVez = 4; // Número de eventos para exibir a cada clique em "Mostrar Mais"

  // Função para obter e exibir eventos da API
  async function obterEventosEExibirCards(id, url, limit) {
    try {
      const response = await fetch(url);
      const eventos = await response.json();

      const wrapperElement = document.getElementById(id);

      // Exibir os próximos eventos no limite definido
      eventos.slice(eventosExibidos, eventosExibidos + limit).forEach(evento => {
        const cardElement = criarCardEvento(evento); // Criar elemento HTML para o card do evento
        wrapperElement.appendChild(cardElement);
      });

      eventosExibidos += limit; // Atualizar o contador de eventos exibidos

      // Verificar se há mais eventos para exibir
      if (eventosExibidos >= eventos.length) {
        const mostrarMaisBtn = document.querySelector('.mostrarMais');
        if (mostrarMaisBtn) {
          mostrarMaisBtn.style.display = 'none'; // Ocultar botão se não houver mais eventos para mostrar
        }
      }

    } catch (error) {
      console.error('Erro ao obter os eventos:', error);
    }
  }

  // Função auxiliar para criar um elemento HTML representando o card de um evento
  function criarCardEvento(evento) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('cards');
    cardElement.dataset.id = evento.id;

    const dataHoraFormatada = formatarDataHora(`${evento.startDate} ${evento.startTime}`);

    cardElement.innerHTML = `
          <img class="banner" src="${evento.bannerUrl}" alt="banner do evento" />
          <p class="event-title">${evento.nome}</p>
          <p><img src="./assets/img/data.svg" alt="Data e Horário do evento" />${dataHoraFormatada}</p>
          <p><img src="./assets/img/local.svg" alt="Local do evento" />${evento.local}</p>
      `;

    cardElement.addEventListener('click', () => {
      window.location.href = `detalhes-evento.html?id=${evento.id}`;
    });

    return cardElement;
  }

  // Carregar os primeiros eventos ao carregar a página
  obterEventosEExibirCards('1', 'http://localhost:3000/eventos', eventosPorVez);
  obterEventosEExibirCards('2', 'http://localhost:3000/eventos', eventosPorVez);

  // Adicionar evento de clique ao botão "Mostrar Mais"
  const mostrarMaisBtn = document.querySelector('.mostrarMais');
  if (mostrarMaisBtn) {
    mostrarMaisBtn.addEventListener('click', () => {
      obterEventosEExibirCards('2', 'http://localhost:3000/eventos', eventosPorVez);
    });
  }
});