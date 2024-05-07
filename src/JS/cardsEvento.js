// Função para obter os eventos do JSON Server e criar os cards de evento
async function obterEventosEExibirCards(id, url) {
  // const url = 'http://localhost:3000/eventos'; // URL do JSON Server (altere conforme necessário)

  try {
    const response = await fetch(url); // Faz a requisição para obter os eventos
    const eventos = await response.json(); // Converte a resposta para JSON

    const wrapperElement = document.getElementById(id);

    // Limpa o conteúdo existente dentro do wrapper (caso deseje recriar os cards)
    wrapperElement.innerHTML = '';

    // Itera sobre os eventos obtidos e cria um card para cada evento
    eventos.forEach(evento => {
      // Cria um novo elemento div para o card do evento
      const cardElement = document.createElement('div');
      cardElement.classList.add('cards');

      // Preenche o conteúdo do card com os detalhes do evento
      cardElement.innerHTML = `
        <img class="imgcard" src="${evento.imagemUrl}" alt="event img" />
        <p class="event-title">${evento.nome}</p>
        <p><img src="./assets/img/data.svg" alt="Data do evento" />${evento.startDate}</p>
        <p><img src="./assets/img/local.svg" alt="Local do evento" />${evento.local}</p>
      `;

      // Adiciona o card criado ao wrapper de cards na página
      wrapperElement.appendChild(cardElement);
    });

  } catch (error) {
    console.error('Erro ao obter os eventos:', error);
    // Trate o erro aqui, se necessário (ex: exibir uma mensagem de erro na página)
  }
}

// Chama a função para obter os eventos e exibir os cards ao carregar a página
document.addEventListener('DOMContentLoaded', obterEventosEExibirCards(1, "http://localhost:3000/eventos"));
document.addEventListener('DOMContentLoaded', obterEventosEExibirCards(2, "http://localhost:3000/eventos"));
