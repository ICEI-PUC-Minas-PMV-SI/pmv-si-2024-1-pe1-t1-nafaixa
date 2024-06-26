document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idEvento = urlParams.get('id');

    if (!idEvento) {
        console.error('ID do evento não encontrado na URL.');
        return;
    }

    try {
        const apiUrlEvento = obterUrlBase() + `/eventos/${idEvento}`;
        const responseEvento = await fetch(apiUrlEvento);
        const evento = await responseEvento.json();

        const imageUrl = evento.bannerURL;
        document.querySelector('.banner-evento').style.backgroundImage = `url('${imageUrl}')`;
        document.querySelector('.imagem-blur').style.backgroundImage = `url('${imageUrl}')`;

        document.querySelector('.nome-evento').textContent = evento.nome;
        document.getElementById('categoria-evento').innerHTML = `<img src="assets/img/tag.svg" alt="categoria" /> ${evento.categoria}`;
        document.getElementById('data-inicio-evento').innerHTML = `<img src="./assets/img/data.svg" alt="Data do evento"/> ${formatarDataHora(evento.startDate)}`;
        document.getElementById('hora-inicio-evento').textContent = ` às ${formatarHora(evento.startTime)}`;
        document.getElementById('data-final-evento').innerHTML = ` > ${formatarDataHora(evento.finalDate)}`;
        document.getElementById('hora-final-evento').textContent = ` às ${formatarHora(evento.finalTime)}`;

        const localElement = document.getElementById('localEvento');
        localElement.innerHTML = evento.tipo === 'presencial' ?
            `<img src="./assets/img/local.svg" alt="Local do evento" /> ${evento.nomeLocal ? evento.nomeLocal + ' - ' + evento.local : evento.local}` :
            `<img src="./assets/img/local.svg" alt="Local do evento" /> ${evento.link}`;

        document.getElementById('descricao-evento').innerHTML = evento.sobre;
        document.getElementById('informacoes-evento').textContent = evento.informacoes;

        const produtorId = evento.produtorId;
        if (produtorId) {
            const apiUrlProdutor = obterUrlBase() + `/produtor/${produtorId}`;
            const responseProdutor = await fetch(apiUrlProdutor);
            const produtor = await responseProdutor.json();

            const sobreProdutorElem = document.getElementById('sobre-produtor');
            sobreProdutorElem.innerHTML = `<b>${produtor.nome}</b><br>${produtor.descricao}</br>`;

            let contatoInfo = '';

            if (produtor.email_publico) {
                contatoInfo += `Contato: ${produtor.email_publico}<br>`;
            }

            if (produtor.celular_publico) {
                contatoInfo += `Celular: ${produtor.celular_publico}`;
            }

            if (contatoInfo) {
                const contatoPublicoProdutorElem = document.createElement('div');
                contatoPublicoProdutorElem.innerHTML = contatoInfo;
                sobreProdutorElem.appendChild(document.createElement('br'));
                sobreProdutorElem.appendChild(contatoPublicoProdutorElem);
            }

            const logoProdutorElement = document.querySelector('.sobre-produtor-icone');
            logoProdutorElement.src = produtor.logo;
            logoProdutorElement.alt = `Logo de ${produtor.nome}`;
        } else {
            console.error('ID do produtor não encontrado no evento.');
        }
    } catch (error) {
        console.error('Erro ao carregar detalhes do evento:', error);
    }
});


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



//Salvar email interessado evento 
document.addEventListener('DOMContentLoaded', () => {
    const enviarEmailBtn = document.querySelector('.enviar-email-btn');

    enviarEmailBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const emailInput = document.getElementById('input-email').value;

        if (!isValidEmail(emailInput)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            return;
        }

        const idEvento = getParameterByName('id');

        if (!idEvento) {
            alert('ID do evento não encontrado na URL.');
            return;
        }

        try {
            const resp = await fetch(obterUrlBase() + `/emails?email=${emailInput}&eventoId=${idEvento}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!resp.ok) {
                throw new Error('Falha ao verificar email. Tente novamente mais tarde.');
            }

            const emailFound = await resp.json();

            if (emailFound.length > 0) {
                throw new Error('Email já cadastrado para esse evento.');
            }

            const response = await fetch(obterUrlBase() + '/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput,
                    eventoId: idEvento
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar o e-mail.');
            }

            alert('E-mail registrado com sucesso!');
            document.getElementById('input-email').value = '';
        } catch (error) {
            console.error('Erro ao salvar o e-mail:', error.message);
            alert(error.message);
        }
    });
});

function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Função para validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
