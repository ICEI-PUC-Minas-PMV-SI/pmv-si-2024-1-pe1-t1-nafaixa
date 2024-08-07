async function initMap(eventos, localSelecionado) {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  navigator.geolocation.getCurrentPosition(
    async (resposta) => {
      console.log("resposta", resposta);
      const { latitude, longitude } = resposta.coords;
      const googleUserLocation = {
        lat: localSelecionado?.latitude || latitude,
        lng: localSelecionado?.longitude || longitude,
      };

      // Obter nome da cidade usando Geocoding Reverse
      const cityName = await getCityFromCoordinates(latitude, longitude);

      // Salvar no localStorage
      if (!isMapLocationBlocked()) {
        localStorage.setItem(
          "mapUserLocation",
          JSON.stringify({ latitude, longitude, cityName })
        );
      }
      localStorage.setItem(
        "currentMapUserLocation",
        JSON.stringify({ latitude, longitude, cityName })
      );

      const savedMapUserLocation = JSON.parse(
        localStorage.getItem("mapUserLocation")
      );

      const map = new Map(document.getElementById("map"), {
        zoom: 11,
        center: isMapLocationBlocked()
          ? {
            lat: savedMapUserLocation?.latitude,
            lng: savedMapUserLocation?.longitude,
          }
          : googleUserLocation,
        mapId: "4504f8b37365c3d0",
      });

      for (const evento of eventos) {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          content: buildContent(evento),
          position: {
            lat: evento.latitude || 23,
            lng: evento.longitude || 23,
          },
          title: evento.description,
        });

        marker.addListener("click", () => {
          toggleHighlight(marker, evento);
        });
      }
    },
    (erro) => console.log("erro", erro),
    { enableHighAccuracy: false }
  );
}

async function getCityFromCoordinates(latitude, longitude) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=CHAVE_GOOGLE_MAPS`
  );
  const data = await response.json();
  if (data.status === "OK") {
    // Extrair o nome da cidade da resposta
    const city = data.results[0].address_components.find(
      (component) =>
        component.types.includes("locality") || component.types.includes("administrative_area_level_2")
    );
    return city?.long_name || "Unknown";
  } else {
    return "Unknown";
  }
}

function toggleHighlight(markerView, evento) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}

function isMapLocationBlocked() {
  const stringValue = localStorage.getItem("isMapLocationBlocked");
  return Boolean(stringValue);
}

function buildContent(evento) {
  const content = document.createElement("div");
  content.classList.add("evento");

  let detalheExtra = "";
  let dataFormatada = formatarDataHora(evento.startDate, evento.startTime);

  if (evento.tipo === "presencial") {
    const local = evento.nomeLocal ? evento.nomeLocal : evento.local;
    detalheExtra = `<p><img src="./assets/img/local.svg" alt="Local do evento" />${local}</p>`;
  } else if (evento.tipo === "online") {
    detalheExtra = `<p><img src="./assets/img/local.svg" alt="Link do evento" />${evento.link}</p>`;
  } else {
    console.error("Tipo de evento desconhecido:", evento.tipo);
    return null;
  }

  content.innerHTML = `
    <div class="icon">
      <img class="imgEventoMapa" src=${evento.bannerURL} alt="event img"/>
    </div>
    <div class="details">
      <p class="event-title">${evento.nome}</p>
      <p><img src="./assets/img/data.svg" alt="Data do evento" />${dataFormatada}</p>
      ${detalheExtra}
    </div>
  `;

  return content;
}

function formatarDataHora(startDate, startTime) {
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const partesData = startDate.split("/");
  const dia = partesData[0];
  const mes = meses[parseInt(partesData[1], 10) - 1];
  const ano = partesData[2];
  const dataFormatada = `${dia.padStart(2, '0')} de ${mes} de ${ano}`;
  return `${dataFormatada} às ${startTime}`;
}
