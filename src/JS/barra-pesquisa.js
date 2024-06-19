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

document.addEventListener('DOMContentLoaded', () => {
    const endpointURL = obterUrlBase() +'/eventos';

    async function obterEventos() {
        try {
            const response = await fetch(endpointURL);
            const eventos = await response.json();
            console.log('Eventos obtidos:', eventos);
            exibirEventos(eventos);
        } catch (error) {
            console.error('Erro ao obter os eventos:', error);
        }
    }

    function exibirEventos(eventos) {
        const eventList = document.getElementById('eventList');
        eventList.innerHTML = '';

        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('q');
        console.log('Palavra-chave de pesquisa:', searchTerm);

        const tituloEventos = document.getElementById('tituloEventos');
        tituloEventos.textContent = searchTerm ? 'Eventos encontrados' : 'Todos os eventos';

        let eventosExibidos = false;

        eventos.forEach(evento => {
            if (!evento) {
                console.error('Evento inválido:', evento);
                return;
            }

            if (isDataFuturaOuHoje(evento.finalDate) && eventMatchesSearch(evento, searchTerm)) {
                console.log('Evento corresponde ao termo de pesquisa:', evento.nome);
                const cardElement = criarCardEvento(evento);
                if (cardElement) {
                    eventList.appendChild(cardElement);
                    eventosExibidos = true;
                }
            } else {
                console.log('Evento não corresponde ao termo de pesquisa ou está em uma data passada:', evento.nome);
                console.log('Evento:', evento);
                console.log('Corresponde ao termo de pesquisa:', eventMatchesSearch(evento, searchTerm));
                console.log('Data válida:', isDataFuturaOuHoje(evento.finalDate));
            }
        });

        if (!eventosExibidos) {
            const mensagemElement = document.createElement('p');
            mensagemElement.textContent = 'Não existem eventos com a palavra-chave pesquisada.';
            eventList.appendChild(mensagemElement);
        }
    }

    function eventMatchesSearch(evento, searchTerm) {
        if (!searchTerm) return true;

        const lowerSearchTerm = searchTerm.trim().toLowerCase();

        if (!evento.nome || typeof evento.nome !== 'string' ||
            !evento.local || typeof evento.local !== 'string' ||
            !evento.tipo || typeof evento.tipo !== 'string') {
            console.error('Evento incompleto ou campos não são strings:', evento);
            return false;
        }

        const lowerNome = evento.nome.trim().toLowerCase();
        const lowerLocal = evento.local.trim().toLowerCase();
        const lowerTipo = evento.tipo.trim().toLowerCase();

        return (
            lowerNome.includes(lowerSearchTerm) ||
            lowerLocal.includes(lowerSearchTerm) ||
            lowerTipo.includes(lowerSearchTerm)
        );
    }

    function criarCardEvento(evento) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("cards");
        cardElement.dataset.id = evento.id;

        const dataHoraFormatada = formatarDataHora(
            evento.startDate,
            evento.startTime
        );

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

        cardElement.addEventListener("click", () => {
            window.location.href = `detalhes-evento.html?id=${evento.id}`;
        });

        return cardElement;
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

    obterEventos();
