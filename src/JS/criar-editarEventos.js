
< !--Formata a data e hora-- >

    flatpickr("#start-date", {
        dateFormat: "d/m/Y",
        locale: "pt",
    });

flatpickr("#start-time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
});

flatpickr("#final-date", {
    dateFormat: "d/m/Y",
    locale: "pt", // 
});

flatpickr("#final-time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
});
//------------------------------------------------------------------------------------------//

//Mostrar/ocultar formulario conforme o tipo de evento//    
document.getElementById("evento-presencial-radio").onclick = function () {
    document.getElementById("evento-presencial-form").style.display = "block";
    document.getElementById("evento-online-form").style.display = "none";
}

document.getElementById("evento-online-radio").onclick = function () {
    document.getElementById("evento-online-form").style.display = "block";
    document.getElementById("evento-presencial-form").style.display = "none";
}

//Preview do banner do evento 
const eventBannerInput = document.querySelector('#event-banner-input');
const eventBannerPreview = document.querySelector('#event-banner-preview')

eventBannerInput.onchange = evt => {
    const [file] = eventBannerInput.files
    if (file) {
        eventBannerPreview.src = URL.createObjectURL(file)
    }
    eventBannerPreview.style.display = "block"
}
//-----------------------------------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/categorias');
        const categorias = await response.json();

        popularCategorias(categorias);
    } catch (error) {
        console.error('Erro ao obter categorias:', error);
    }
});

function popularCategorias(categorias) {
    const selectCategorias = document.querySelector('#categorias');

    selectCategorias.innerHTML = '<option value="">Categoria</option>';

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.nome;
        option.textContent = categoria.nome;
        selectCategorias.appendChild(option);
    });
}
//-----------------------------------------------------------------------------------------------------------------//
tinymce.init({
    selector: '#sobre',
    height: 300
});

let selectedPlace = null;
let bannerUrl = null;

function initializeAutocomplete() {
    var input = document.getElementById('local');
    var options = {
        componentRestrictions: { country: 'BR' }
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', function () {
        selectedPlace = autocomplete.getPlace();
    });
}

const cloudName = "nafaixa";
const uploadPreset = "nafaixa";

const myWidget = cloudinary.createUploadWidget(
    {
        cloudName: cloudName,
        uploadPreset: uploadPreset
    },
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Upload concluído! Aqui estão as informações da imagem: ", result.info);
            alert('Upload de imagem concluído!');
            document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);
            bannerUrl = result.info.secure_url; // Armazene a URL da imagem carregada
        }
    }
);

document.getElementById("event-banner-input").addEventListener(
    "click",
    function () {
        myWidget.open();
    },
    false
);

async function criarEvento() {
    const termsCheckbox = document.getElementById('terms-checkbox');

    if (!termsCheckbox.checked) {
        alert('Você precisa aceitar os termos de uso antes de criar o evento.');
        return;
    }

    const nomeEvento = document.querySelector('#nome');
    const categorias = document.querySelector('#categorias');
    const tipoEvento = document.querySelector('input[name="event-type"]:checked');
    const startDateEvento = document.querySelector('#start-date');
    const startTimeEvento = document.querySelector('#start-time');
    const sobreEvento = document.querySelector('#sobre');
    const informacoesEvento = document.querySelector('#informacoes');
    const sobre = tinymce.get('sobre').getContent();

    if (!nomeEvento.value) {
        alert('O campo nome é obrigatório.');
        nomeEvento.focus();
        return;
    }
    if (!categorias.value) {
        alert('O campo categorias é obrigatório.');
        categorias.focus();
        return;
    }
    if (!tipoEvento) {
        alert('Selecione o tipo de evento (presencial ou online).');
        return;
    }
    if (!startDateEvento.value) {
        alert('O campo data de início do evento é obrigatório.');
        startDateEvento.focus();
        return;
    }
    if (!startTimeEvento.value) {
        alert('O campo horário de início do evento é obrigatório.');
        startTimeEvento.focus();
        return;
    }
    if (!sobre.trim()) {
        alert('O campo sobre o evento é obrigatório.');
        return;
    }
    if (!informacoesEvento.value) {
        alert('O campo informações adicionais é obrigatório.');
        informacoesEvento.focus();
        return;
    }

    const tipoEventoValue = tipoEvento.value;

    if (tipoEventoValue === 'presencial') {
        if (!selectedPlace || !selectedPlace.formatted_address) {
            alert('O campo local é obrigatório para eventos presenciais.');
            document.getElementById('local').focus();
            return;
        }
    }

    if (tipoEventoValue === 'online') {
        const linkEventoOnline = document.querySelector('#link-evento-online');
        if (!linkEventoOnline.value) {
            alert('O campo link do evento é obrigatório para eventos online.');
            linkEventoOnline.focus();
            return;
        }
    }

    try {
        const response = await fetch(`http://localhost:3000/eventos?nome=${encodeURIComponent(nomeEvento.value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao verificar a existência do evento');
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const existingEvent = data[0];

            const existingStartDate = new Date(existingEvent.startDate);
            const selectedStartDate = new Date(startDateEvento.value);

            if (existingEvent.local === (selectedPlace ? selectedPlace.formatted_address : '') &&
                existingStartDate.getTime() === selectedStartDate.getTime()) {
                alert('Já existe um evento com o mesmo nome, local e data de início. Por favor, crie um evento que ainda não exista em nosso site.');
                return;
            }
        }

        if (!bannerUrl) {
            alert('É obrigatório fazer o upload de uma imagem para o banner do evento.');
            return;
        }

        const idEvento = uuidv4();
        const categoriaValue = categorias.value;
        const link = tipoEventoValue === 'online' ? document.querySelector('#link-evento-online').value : '';
        const finalDateEvento = document.querySelector('#final-date').value;
        const finalTimeEvento = document.querySelector('#final-time').value;

        const produtorId = localStorage.getItem('userData');

        if (!produtorId) {
            alert('Erro ao obter o ID do produtor. Faça login novamente.');
            return;
        }

        const evento = {
            id: idEvento,
            produtorId: produtorId,
            tipo: tipoEventoValue,
            categoria: categoriaValue,
            nome: nomeEvento.value,
            link: link,
            local: selectedPlace ? selectedPlace.formatted_address : '',
            latitude: selectedPlace ? selectedPlace.geometry.location.lat() : null,
            longitude: selectedPlace ? selectedPlace.geometry.location.lng() : null,
            startDate: startDateEvento.value,
            startTime: startTimeEvento.value,
            finalDate: finalDateEvento,
            finalTime: finalTimeEvento,
            sobre: sobre,
            informacoes: informacoesEvento.value,
            bannerURL: bannerUrl
        };

        const createResponse = await fetch('http://localhost:3000/eventos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(evento),
        });

        if (!createResponse.ok) {
            throw new Error('Erro ao criar evento');
        }

        const responseData = await createResponse.json();
        console.log('Evento criado:', responseData);
        alert('Evento criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar evento:', error);
        alert('Erro ao criar evento. Tente novamente mais tarde.');
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeAutocomplete();

    const startDateInput = document.querySelector('#start-date');
    const finalDateInput = document.querySelector('#final-date');

    const startDatePicker = flatpickr(startDateInput, {
        dateFormat: "d/m/Y",
        locale: "pt",
        minDate: "today",
        onClose: function (selectedDates) {
            if (selectedDates.length > 0) {
                const minDate = selectedDates[0];
                finalDatePicker.set('minDate', minDate);
            }
        }
    });

    const finalDatePicker = flatpickr(finalDateInput, {
        dateFormat: "d/m/Y",
        locale: "pt",
    });

    const criarEventoBtn = document.querySelector('.criar-evento-btn');
    criarEventoBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const startDate = startDatePicker.selectedDates[0];
        const finalDate = finalDatePicker.selectedDates[0];

        if (!startDate || !finalDate) {
            alert('Por favor, selecione as datas de início e final do evento.');
            return;
        }

        if (startDate.getTime() > finalDate.getTime()) {
            alert('A data final do evento deve ser posterior à data de início.');
            return;
        }

        criarEvento();
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    initializeAutocomplete();

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('edit');

    if (eventId) {
        try {
            const response = await fetch(`http://localhost:3000/eventos/${eventId}`);
            if (!response.ok) {
                throw new Error('Erro ao carregar dados do evento');
            }

            const event = await response.json();
            populateForm(event);

            const criarEventoBtn = document.querySelector('.criar-evento-btn');
            criarEventoBtn.textContent = 'Salvar alterações';
            criarEventoBtn.addEventListener('click', (event) => {
                event.preventDefault();
                updateEvent(event, startDatePicker, finalDatePicker);
            });
        } catch (error) {
            console.error('Erro ao carregar evento:', error);
        }
    } else {
        const criarEventoBtn = document.querySelector('.criar-evento-btn');
        criarEventoBtn.addEventListener('click', criarEvento);
    }

    const startDateInput = document.querySelector('#start-date');
    const finalDateInput = document.querySelector('#final-date');

    const startDatePicker = flatpickr(startDateInput, {
        dateFormat: "d/m/Y",
        locale: "pt",
        minDate: "today",
        onClose: function (selectedDates) {
            if (selectedDates.length > 0) {
                const minDate = selectedDates[0];
                finalDatePicker.set('minDate', minDate);
            }
        }
    });

    const finalDatePicker = flatpickr(finalDateInput, {
        dateFormat: "d/m/Y",
        locale: "pt",
    });
});

function populateForm(event) {
    document.querySelector('#nome').value = event.nome;
    document.querySelector('#categorias').value = event.categoria;
    document.querySelector(input[name = "event-type"][value = "${event.tipo}"]).checked = true;

    if (event.tipo === 'presencial') {
        document.querySelector('#local').value = event.local;
        selectedPlace = {
            formatted_address: event.local,
            geometry: {
                location: {
                    lat: () => event.latitude,
                    lng: () => event.longitude,
                }
            }
        };
    } else {
        document.querySelector('#link-evento-online').value = event.link;
    }

    document.querySelector('#start-date').value = event.startDate;
    document.querySelector('#start-time').value = event.startTime;
    document.querySelector('#final-date').value = event.finalDate;
    document.querySelector('#final-time').value = event.finalTime;
    tinymce.get('sobre').setContent(event.sobre);
    document.querySelector('#informacoes').value = event.informacoes;
    document.querySelector('#uploadedimage').src = event.bannerURL;
    bannerUrl = event.bannerURL;
}

async function updateEvent(event, startDatePicker, finalDatePicker) {
    const termsCheckbox = document.getElementById('terms-checkbox');

    if (!termsCheckbox.checked) {
        alert('Você precisa aceitar os termos de uso antes de atualizar o evento.');
        return;
    }

    const nomeEvento = document.querySelector('#nome');
    const categorias = document.querySelector('#categorias');
    const tipoEvento = document.querySelector('input[name="event-type"]:checked');
    const startDateEvento = document.querySelector('#start-date');
    const startTimeEvento = document.querySelector('#start-time');
    const sobreEvento = document.querySelector('#sobre');
    const informacoesEvento = document.querySelector('#informacoes');
    const sobre = tinymce.get('sobre').getContent();

    if (!nomeEvento.value) {
        alert('O campo nome é obrigatório.');
        nomeEvento.focus();
        return;
    }
    if (!categorias.value) {
        alert('O campo categorias é obrigatório.');
        categorias.focus();
        return;
    }
    if (!tipoEvento) {
        alert('Selecione o tipo de evento (presencial ou online).');
        return;
    }
    if (!startDateEvento.value) {
        alert('O campo data de início do evento é obrigatório.');
        startDateEvento.focus();
        return;
    }
    if (!startTimeEvento.value) {
        alert('O campo horário de início do evento é obrigatório.');
        startTimeEvento.focus();
        return;
    }
    if (!sobre.trim()) {
        alert('O campo sobre o evento é obrigatório.');
        return;
    }
    if (!informacoesEvento.value) {
        alert('O campo informações adicionais é obrigatório.');
        informacoesEvento.focus();
        return;
    }

    const tipoEventoValue = tipoEvento.value;

    if (tipoEventoValue === 'presencial') {
        if (!selectedPlace || !selectedPlace.formatted_address) {
            alert('O campo local é obrigatório para eventos presenciais.');
            document.getElementById('local').focus();
            return;
        }
    }

    if (tipoEventoValue === 'online') {
        const linkEventoOnline = document.querySelector('#link-evento-online');
        if (!linkEventoOnline.value) {
            alert('O campo link do evento é obrigatório para eventos online.');
            linkEventoOnline.focus();
            return;
        }
    }

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('edit');

        if (!bannerUrl) {
            alert('É obrigatório fazer o upload de uma imagem para o banner do evento.');
            return;
        }

        const produtorId = localStorage.getItem('userData');

        if (!produtorId) {
            alert('Erro ao obter o ID do produtor. Faça login novamente.');
            return;
        }

        const categoriaValue = categorias.value;
        const link = tipoEvento.value === 'online' ? document.querySelector('#link-evento-online').value : '';
        const finalDateEvento = document.querySelector('#final-date').value;
        const finalTimeEvento = document.querySelector('#final-time').value;

        const evento = {
            tipo: tipoEvento.value,
            produtorId: produtorId,
            categoria: categoriaValue,
            nome: nomeEvento.value,
            link: link,
            local: selectedPlace ? selectedPlace.formatted_address : '',
            latitude: selectedPlace ? selectedPlace.geometry.location.lat() : null,
            longitude: selectedPlace ? selectedPlace.geometry.location.lng() : null,
            startDate: startDateEvento.value,
            startTime: startTimeEvento.value,
            finalDate: finalDateEvento,
            finalTime: finalTimeEvento,
            sobre: sobre,
            informacoes: informacoesEvento.value,
            bannerURL: bannerUrl
        };

        const updateResponse = await fetch(`http://localhost:3000/eventos/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(evento),
        });

        if (!updateResponse.ok) {
            throw new Error('Erro ao atualizar evento');
        }

        const responseData = await updateResponse.json();
        console.log('Evento atualizado:', responseData);
        alert('Evento atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar evento:', error);
        alert('Erro ao atualizar evento. Tente novamente mais tarde.');
    }
}



