async function initMap(eventos) {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  navigator.geolocation.getCurrentPosition(
    async (resposta) => {
      console.log("resposta", resposta);
      const { latitude, longitude } = resposta.coords;
      const userLocation = {
        lat: latitude,
        lng: longitude,
      };
      localStorage.setItem(
        "mapUserLocation",
        JSON.stringify({ latitude, longitude })
      );
      const map = new Map(document.getElementById("map"), {
        zoom: 11,
        center: userLocation,
        mapId: "4504f8b37365c3d0",
      });

      for (const evento of eventos) {
        const AdvancedMarkerElement =
          new google.maps.marker.AdvancedMarkerElement({
            map,
            content: buildContent(evento),
            position: {
              lat: evento.latitude || 23,
              lng: evento.longitude || 23,
            },
            title: evento.description,
          });

        AdvancedMarkerElement.addListener("click", () => {
          toggleHighlight(AdvancedMarkerElement, evento);
        });
      }
    },
    (erro) => console.log("erro", erro),
    { enableHighAccuracy: true }
  );
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

function buildContent(evento) {
  const content = document.createElement("div");

  content.classList.add("evento");
  content.innerHTML = `
  <div class="icon">
  <img class="imgEventoMapa"
  src=${evento.bannerURL}
  alt="event img"/>
  </div>

  <div class="details">
    <p class="event-title">${evento.nome}</p>
    <p><img src="./assets/img/data.svg" alt="Data do evento" />${evento.startDate}</p>
    <p>
      <img src="./assets/img/local.svg" alt="Local do evento" />${evento.local}
    </p>
  </div>

  `;

  return content;
}
