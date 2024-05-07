document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar-container');
    const locationLink = document.getElementById('city');


    //   // Carregar localização salva no localStorage ao iniciar a página
    //   loadSavedLocation();z

    navbar.addEventListener('click', function(event) {
        if (event.target.id === 'city') {
            event.preventDefault();

            const locationPopup = document.getElementById('locationPopup');
            locationPopup.style.display = 'block';

            const locationInput = document.getElementById('locationInput');
            const autocomplete = new google.maps.places.Autocomplete(locationInput, {
                types: ['(cities)'],
                componentRestrictions: { country: 'BR' }
            });

            autocomplete.addListener('place_changed', function() {
                const place = autocomplete.getPlace();
                if (place && place.address_components) {
                    const cityName = place.address_components.find(component => {
                        return component.types.includes('locality');
                    });
                    if (cityName) {
                        document.getElementById('city').textContent = cityName.long_name;
                    }
                }
            });
        }
    });
});

        function saveLocationToLocalStorage(cityName) {
            localStorage.setItem('userLocation', cityName);
        }

        function loadSavedLocation() {
            const savedLocation = localStorage.getItem('userLocation');
            if (savedLocation) {
                locationLink.textContent = savedLocation;
            }
        }

        loadSavedLocation();

      document.addEventListener('click', function(event) {
          if (!locationPopup.contains(event.target) && event.target !== locationLink && event.target !== locationLinkMobile) {
              locationPopup.style.display = 'none';
          }
      });
