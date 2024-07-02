
function handleCriarEventoOnClick(e) {
    if (!isUserLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    };
};

function isUserLoggedIn() {
    return localStorage.getItem('userData');
};

// Função para obter a geolocalização do usuário
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const geocoder = new google.maps.Geocoder();
                const latlng = { lat: latitude, lng: longitude };

                geocoder.geocode({ location: latlng }, (results, status) => {
                    if (status === "OK") {
                        if (results[0]) {
                            const cityName = results[0].address_components[3].long_name;

                            localStorage.setItem('userLocation', JSON.stringify({
                                latitude: latitude,
                                longitude: longitude,
                                city: cityName
                            }));

                            updateNavbarLocation(cityName);
                        }
                    }
                });
            },
            (error) => {
                console.error('Erro ao obter localização:', error);
            }
        );
    } else {
        console.error('Geolocalização não suportada pelo navegador.');
    }
}

// Função para abrir o popup/fechar o popup
const popup = document.getElementById('locationPopup');

function openPopup() {
    popup.style.display = 'block';

    window.addEventListener('click', closePopupOutside);

    window.addEventListener('keydown', closePopupOnEsc);

    function closePopupOutside(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
            window.removeEventListener('click', closePopupOutside);
            window.removeEventListener('keydown', closePopupOnEsc);
        }
    }

    function closePopupOnEsc(event) {
        if (event.key === 'Escape') {
            popup.style.display = 'none';
            window.removeEventListener('click', closePopupOutside);
            window.removeEventListener('keydown', closePopupOnEsc);
        }
    }

    //Função de autocomplete do google no input do popup
    var input = document.getElementById('cityInput');
    var autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)'],
        componentRestrictions: { country: 'BR' }
    });

    autocomplete.addListener('place_changed', function () {
        var selectedPlace = autocomplete.getPlace();
        if (!selectedPlace.geometry) {
            return;
        }

        var cityName = selectedPlace.name;

        updateNavbarLocation(cityName);

        localStorage.setItem('userLocation', JSON.stringify({
            cityName: cityName,
            latitude: selectedPlace.geometry.location.lat(),
            longitude: selectedPlace.geometry.location.lng()
        }));
        window.location.href = window.location.href;

        document.getElementById('locationPopup').style.display = 'none';
    });
}

// Função para atualizar a localização na navbar
function updateNavbarLocation(cityName) {
    var locationElementWeb = document.getElementById('escolherLocalização');
    var locationElementMobile = document.getElementById('escolherLocalizacaoMobile');
    var locationElementLoggedIn = document.getElementById('escolherLocalizaçãoLoggedin');
    if (locationElementWeb) {
        locationElementWeb.textContent = cityName;
    }
    if (locationElementMobile) {
        locationElementMobile.textContent = cityName;
    }
    if (locationElementLoggedIn) {
        locationElementLoggedIn.textContent = cityName;
    }
}

window.onload = function () {
    var userLocation = localStorage.getItem('userLocation');
    if (userLocation) {
        userLocation = JSON.parse(userLocation);
        if (userLocation.cityName) {
            updateNavbarLocation(userLocation.cityName);
        }
    }
};

// Função para atualizar o nome da cidade na navbar
function updateNavbarLocation(cityName) {
    var locationElementWeb = document.getElementById('escolherLocalização');
    var locationElementMobile = document.getElementById('escolherLocalizacaoMobile');
    var locationElementLoggedIn = document.getElementById('escolherLocalizaçãoLoggedin');
    if (locationElementWeb) {
        locationElementWeb.textContent = cityName;
    }
    if (locationElementMobile) {
        locationElementMobile.textContent = cityName;
    }
    if (locationElementLoggedIn) {
        locationElementLoggedIn.textContent = cityName;
    }
}

window.onload = () => {
    const userLocation = JSON.parse(localStorage.getItem('userLocation'));
    if (!userLocation) {
        getLocation();
    } else {
        updateNavbarLocation(userLocation.city);
    }
};

// Função para carregar e definir a localização ao recarregar a página
function loadUserLocation() {
    var userLocation = localStorage.getItem('userLocation');
    if (userLocation) {
        userLocation = JSON.parse(userLocation);
        if (userLocation.cityName) {
            updateNavbarLocation(userLocation.cityName);
        }
    }
}

window.addEventListener('load', function () {
    loadUserLocation();
});

</script >
    <script
        src="https://maps.googleapis.com/maps/api/js?key=CHAVE_GOOGLE_MAPS&libraries=places&language=pt-BR"></script>
</script >