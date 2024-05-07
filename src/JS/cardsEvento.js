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


// Função para obter os eventos do JSON Server e criar os cards de evento
async function obterEventosEExibirCards(id, url) {
  try {
    const response = await fetch(url); 
    const eventos = await response.json(); 

    const wrapperElement = document.getElementById(id);

    wrapperElement.innerHTML = '';

    eventos.forEach(evento => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('cards');
      cardElement.dataset.id = evento.id; 

      const dataHoraFormatada = formatarDataHora(evento.startDate, evento.startTime);

      cardElement.innerHTML = `
        <img class="banner" src="${evento.bannerUrl}" alt="banner do evento" />
        <p class="event-title">${evento.nome}</p>
        <p><img src="./assets/img/data.svg" alt="Data e Horário do evento" />${dataHoraFormatada}</p>
        <p><img src="./assets/img/local.svg" alt="Local do evento" />${evento.local}</p>
      `;

      wrapperElement.appendChild(cardElement);

      cardElement.addEventListener('click', () => {
        window.location.href = `detalhes-evento.html?id=${evento.id}`;
      });
    });

  } catch (error) {
    console.error('Erro ao obter os eventos:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  obterEventosEExibirCards(1, "http://localhost:3000/eventos");
  obterEventosEExibirCards(2, "http://localhost:3000/eventos");
});
