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
            const resp = await fetch(`http://localhost:3000/emails?email=${emailInput}&eventoId=${idEvento}`, {
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

            const response = await fetch('http://localhost:3000/emails', {
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
