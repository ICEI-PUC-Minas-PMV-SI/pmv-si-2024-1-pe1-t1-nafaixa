async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const center = { lat: 37.43238031167444, lng: -122.16795397128632 };
  const map = new Map(document.getElementById("map"), {
    zoom: 11,
    center,
    mapId: "4504f8b37365c3d0",
  });

  for (const evento of eventos) {
    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(evento),
      position: evento.localizacao,
      title: evento.description,
    });

    AdvancedMarkerElement.addListener("click", () => {
      toggleHighlight(AdvancedMarkerElement, evento);
    });
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

function buildContent(evento) {
  const content = document.createElement("div");

  content.classList.add("evento");
  content.innerHTML = `
  <div class="icon">
  <img class="imgEventoMapa"
  src="assets/img/download (1).jpeg"
  alt="event img"/>
  </div>

  <div class="details">
    <p class="event-title">${evento.nome}</p>
    <p><img src="./assets/img/data.svg" alt="Data do evento" />Data</p>
    <p>
      <img src="./assets/img/local.svg" alt="Local do evento" />${evento.endereco}
    </p>
  </div>

  `;

  return content;
}

const eventos = [
  {
    nome: "Evento1",
    endereco: "215 Emily St, MountainView, CA",
    localizacao: {
      lat: 37.50024109655184,
      lng: -122.28528451834352,
    },
  },
  {
    nome: "Evento2",
    endereco: "108 Squirrel Ln &#128063;, Menlo Park, CA",
    localizacao: {
      lat: 37.44440882321596,
      lng: -122.2160620727,
    },
  },
  {
    nome: "Evento3",
    endereco: "100 Chris St, Portola Valley, CA",
    localizacao: {
      lat: 37.39561833718522,
      lng: -122.21855116258479,
    },
  },
  {
    nome: "Evento4",
    endereco: "98 Aleh Ave, Palo Alto, CA",
    localizacao: {
      lat: 37.423928529779644,
      lng: -122.1087629822001,
    },
  },
  {
    nome: "Evento5",
    endereco: "2117 Su St, MountainView, CA",
    localizacao: {
      lat: 37.40578635332598,
      lng: -122.15043378466069,
    },
  },
  {
    nome: "Evento6",
    endereco: "197 Alicia Dr, Santa Clara, CA",
    localizacao: {
      lat: 37.36399747905774,
      lng: -122.10465384268522,
    },
  },
  {
    nome: "Evento7",
    endereco: "700 Jose Ave, Sunnyvale, CA",
    localizacao: {
      lat: 37.38343706184458,
      lng: -122.02340436985183,
    },
  },
  {
    nome: "Evento8",
    endereco: "868 Will Ct, Cupertino, CA",
    localizacao: {
      lat: 37.34576403052,
      lng: -122.04455090047453,
    },
  },
  {
    nome: "Evento9",
    endereco: "655 Haylee St, Santa Clara, CA",
    localizacao: {
      lat: 37.362863347890716,
      lng: -121.97802139023555,
    },
  },
  {
    nome: "Evento10",
    endereco: "2019 Natasha Dr, San Jose, CA",
    localizacao: {
      lat: 37.41391636421949,
      lng: -121.94592071575907,
    },
  },
];

initMap();
