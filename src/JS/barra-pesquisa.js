

document.addEventListener('DOMContentLoaded', () => {
    const endpointURL = 'http://localhost:3000/eventos';

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
        if (searchTerm) {
            tituloEventos.textContent = `Eventos encontrados`;
        } else {
            tituloEventos.textContent = 'Todos os Eventos';
        }

        let eventosExibidos = false;

        eventos.forEach(evento => {
            if (!evento) {
                console.error('Evento inválido:', evento);
                return;
            }

            if (eventMatchesSearch(evento, searchTerm)) {
                console.log('Evento corresponde ao termo de pesquisa:', evento.nome);
                const cardElement = criarCardEvento(evento);
                eventList.appendChild(cardElement);
                eventosExibidos = true;
            } else {
                console.log('Evento não corresponde ao termo de pesquisa:', evento.nome);
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

        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
            evento.nome.toLowerCase().includes(lowerSearchTerm) ||
            evento.local.toLowerCase().includes(lowerSearchTerm) ||
            evento.tipo.toLowerCase().includes(lowerSearchTerm)
        );
    }

    function criarCardEvento(evento) {
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

        return cardElement;
    }

    function formatarDataHora(startDate, startTime) {
        return `${startDate} ${startTime}`;
    }

    obterEventos();
});