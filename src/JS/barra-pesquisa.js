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
        tituloEventos.textContent = searchTerm ? 'Eventos encontrados' : 'Todos os Eventos';

        let eventosExibidos = false;

        eventos.forEach(evento => {
            if (!evento) {
                console.error('Evento inválido:', evento);
                return;
            }

            if (eventMatchesSearch(evento, searchTerm)) {
                console.log('Evento corresponde ao termo de pesquisa:', evento.nome);
                const cardElement = criarCardEvento(evento);
                if (cardElement) {
                    eventList.appendChild(cardElement);
                    eventosExibidos = true;
                }
            } else {
                console.log('Evento não corresponde ao termo de pesquisa:', evento.nome);
                console.log('Evento:', evento);
                console.log('Corresponde ao termo de pesquisa:', eventMatchesSearch(evento, searchTerm));

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
