document.addEventListener('DOMContentLoaded', function() {
  const locationLink = document.getElementById('city');
  const locationLinkMobile = document.getElementById('city-mobile');
  const locationPopup = document.getElementById('locationPopup');
  const locationInput = document.getElementById('locationInput');

  // Carregar localização salva no localStorage ao iniciar a página
  loadSavedLocation();

  // Função para atualizar a localização na barra de navegação da web (navcenter)
  locationLink.addEventListener('click', function(event) {
      event.preventDefault();
      openLocationPopup(locationLink);
  });

  // Função para atualizar a localização na barra de navegação móvel (navcenter-mobile)
  locationLinkMobile.addEventListener('click', function(event) {
      event.preventDefault();
      openLocationPopup(locationLinkMobile);
  });

  function openLocationPopup(linkElement) {
      locationPopup.style.display = 'block';

      const autocomplete = new google.maps.places.Autocomplete(locationInput, {
          types: ['(cities)'],
          componentRestrictions: { country: 'BR' }
      });

      autocomplete.addListener('place_changed', function() {
          const place = autocomplete.getPlace();

          if (place && place.address_components) {
              const city = place.address_components.find(component => {
                  return component.types.includes('locality');
              });

              if (city) {
                  const cityName = city.long_name;
                  updateNavbarLocation(linkElement, cityName);
                  saveLocationToLocalStorage(cityName); // Salvar localização no localStorage
              }
          }
      });
  }

  function updateNavbarLocation(linkElement, cityName) {
      linkElement.textContent = cityName;
      locationPopup.style.display = 'none';
  }

  function saveLocationToLocalStorage(cityName) {
      localStorage.setItem('userLocation', cityName);
  }

  function loadSavedLocation() {
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
          updateNavbarLocation(locationLink, savedLocation); // Atualizar na barra de navegação da web
          updateNavbarLocation(locationLinkMobile, savedLocation); // Atualizar na barra de navegação móvel
      }
  }

  document.addEventListener('click', function(event) {
      if (!locationPopup.contains(event.target) && event.target !== locationLink && event.target !== locationLinkMobile) {
          locationPopup.style.display = 'none';
      }
  });
});