document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready!");

  const apiUrl = `http://localhost:3000/eventos`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((eventos) => {
      const divContainerCards = document.getElementById("cards-container");

      eventos.forEach((evento) => {
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
    })
    .catch((error) => {
      console.error("Erro ao carregar categoria:", error);
    });
});

function formatarDataHora(startDate, startTime) {
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const partesData = startDate.split("/");
  const dia = partesData[0];
  const mes = meses[parseInt(partesData[1], 10) - 1];
  const ano = partesData[2];
  const dataFormatada = `${dia.padStart(2, '0')} de ${mes} de ${ano}`;
  return `${dataFormatada} às ${startTime}`;
}