document.addEventListener('DOMContentLoaded', () => {
    const eventosContainer = document.getElementById('meus-eventos-container');
    const produtorId = localStorage.getItem('userData');

    if (!produtorId) {
        console.error('Produtor ID não encontrado no localStorage');
        return;
    }

    fetch('http://localhost:3000/eventos')
        .then(response => response.json())
        .then(eventos => {
            const eventosDoProdutor = eventos.filter(evento => evento.produtorId === produtorId);

            if (eventosDoProdutor.length === 0) {
                eventosContainer.innerHTML = '<p>Você ainda não possui eventos. Crie agora mesmo seu evento clicando no botão da barra de navegação.</p>';
            } else {
                eventosDoProdutor.forEach(evento => {
                    fetch(`http://localhost:3000/emails?eventoId=${evento.id}`)
                        .then(response => response.json())
                        .then(emails => {
                            const emailCount = emails.length;
                            const card = createEventCard(evento, emailCount);
                            eventosContainer.appendChild(card);

                            const editButton = card.querySelector('.edit-btn');
                            editButton.addEventListener('click', () => handleEdit(evento.id));

                            const deleteButton = card.querySelector('.delete-btn');
                            deleteButton.addEventListener('click', () => handleDelete(evento.id));
                        })
                        .catch(error => console.error('Erro ao buscar emails:', error));
                });
            }
        })
        .catch(error => console.error('Erro ao buscar eventos:', error));
});

function createEventCard(evento, emailCount) {
    const card = document.createElement('div');
    card.classList.add('cards-meus-eventos');

    card.innerHTML = `
<a href="detalhes-evento.html?id=${evento.id}" class="img-container">
    <img class="img-meu-evento" src="${evento.bannerURL}" alt="img do meu evento">
</a>

<div class="detalhes-evento">
    <a href="detalhes-evento.html?id=${evento.id}">
        <h2>${evento.nome}</h2>
    </a>
    <div>
        <img src="./assets/img/local.svg" alt="Local do evento" />
        ${evento.tipo === 'presencial' ? (evento.nomeLocal ? evento.nomeLocal + ' - ' + evento.local : evento.local) : evento.link}
    </div>
    <div>
        <img src="assets/img/data.svg" alt="">${evento.startDate}
    </div>
    <div>
        <img src="assets/img/bi_people.svg" alt="">Pessoas confirmadas:<p>${emailCount}</p>
    </div>

    <div class="action-icons">
        <button class="edit-btn" data-id="${evento.id}">
            <span class="material-symbols-outlined">edit</span>
            <span>Editar</span>
        </button>
        <button class="delete-btn" data-id="${evento.id}">
            <span class="material-symbols-outlined">delete</span>
            Excluir
        </button>
    </div>
</div>
`;

    return card;
}

function handleEdit(eventId) {
    window.location.href = `criar-evento.html?edit=${eventId}`;
}

function handleDelete(eventId) {
    const confirmed = confirm('Tem certeza que deseja excluir esse evento? Essa ação é irreversível.');

    if (confirmed) {
        fetch(`http://localhost:3000/eventos/${eventId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    document.querySelector(`[data-id="${eventId}"]`).closest('.cards-meus-eventos').remove();
                } else {
                    console.error('Erro ao excluir evento');
                }
            })
            .catch(error => console.error('Erro ao excluir evento:', error));
    }
}
