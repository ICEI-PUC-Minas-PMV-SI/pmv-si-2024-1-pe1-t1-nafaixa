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
                eventosContainer.innerHTML = '<p>Nenhum evento encontrado para este produtor.</p>';
            } else {
                eventosDoProdutor.forEach(evento => {
                    const card = createEventCard(evento);
                    eventosContainer.appendChild(card);
                });

                document.querySelectorAll('.edit-btn').forEach(button => {
                    button.addEventListener('click', handleEdit);
                });

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', handleDelete);
                });
            }
        })
        .catch(error => console.error('Erro ao buscar eventos:', error));
});

function createEventCard(evento) {
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
    <div><img src="./assets/img/local.svg" alt="Local do evento" />${evento.local}</div>
    <div><img src="assets/img/data.svg" alt="">${evento.startDate}</div>
    <div><img src="assets/img/bi_people.svg" alt="">Pessoas confirmadas:<p>150</p></div>

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

function handleEdit(event) {
    const id = event.target.closest('.edit-btn').dataset.id;
    window.location.href = criar-evento.html?id=${id};
}


function handleDelete(event) {
    const id = event.target.closest('.delete-btn').dataset.id;
    const confirmed = confirm('Tem certeza que deseja excluir esse evento? Essa ação é irreversível.');

    if (confirmed) {
        fetch('http://localhost:3000/eventos/${id}', {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    event.target.closest('.cards-meus-eventos').remove();
                } else {
                    console.error('Erro ao excluir evento');
                }
            })
            .catch(error => console.error('Erro ao excluir evento:', error));
                }
            }