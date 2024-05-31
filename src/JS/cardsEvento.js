// Função para formatar a data
function formatarData(data) {
  const partes = data.split("/");

  if (partes.length !== 3) {
    console.error("Formato de data inválido:", data);
    return null;
  }

  const dia = parseInt(partes[0], 10);
  const mesNumero = parseInt(partes[1], 10);
  const ano = parseInt(partes[2], 10);

  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const mesNome = meses[mesNumero - 1];

  return `${dia} de ${mesNome} de ${ano}`;
}

// Função para formatar a hora
function formatarHora(hora) {
  const partes = hora.split(":");

  if (partes.length !== 2) {
    console.error("Formato de hora inválido:", hora);
    return null;
  }

  const horas = parseInt(partes[0], 10);
  const minutos = parseInt(partes[1], 10);
  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}`;
}

// Função para formatar data e hora juntas
function formatarDataHora(data, hora) {
  const dataFormatada = formatarData(data);
  const horaFormatada = formatarHora(hora);

  if (!dataFormatada || !horaFormatada) {
    return null;
  }

  return `${dataFormatada} às ${horaFormatada}`;
}

function estaEmEventosProximos() {
  return window.location.href.includes("Proximo");
}

//Paginação e mostrar eventos por localização e todos os eventos sem filtragem
document.addEventListener("DOMContentLoaded", () => {
  const localizacaoSelect = document.getElementById("escolherLocalização");

  const eventosPorVez = 4;
  const raioMaximoKm = 50;
  const endpointURL = "http://localhost:3000/eventos";

  const mapUserLocation = localStorage.getItem("mapUserLocation");
  const selectedUserLocation = localStorage.getItem("userLocation");
  const userLocation = estaEmEventosProximos()
    ? mapUserLocation
    : selectedUserLocation;
  const state = {
    eventosExibidosId1: 0,
    eventosExibidosId2: 0,
    userLocation: JSON.parse(userLocation),
    eventos: [],
  };

  async function obterEventos() {
    try {
      const response = await fetch(endpointURL);
      state.eventos = await response.json();
      exibirEventos("eventosFiltrados");
      exibirEventos("todosEventos");
    } catch (error) {
      console.error("Erro ao obter os eventos:", error);
    }
  }

  function exibirEventos(id) {
    const { eventos, userLocation, eventosExibidosId1, eventosExibidosId2 } =
      state;
    const wrapperElement = document.getElementById(id);

    const startIndex =
      id === "eventosFiltrados" ? eventosExibidosId1 : eventosExibidosId2;

    let eventosExibidos = false;
    const eventosFiltrados = eventos.filter(
      (evento) =>
        id === "todosEventos" ||
        (id === "eventosFiltrados" && isEventoProximo(evento, userLocation))
    );
    const eventosParaExibir = estaEmEventosProximos()
      ? eventosFiltrados.slice(startIndex, startIndex + eventosPorVez)
      : eventosFiltrados.slice(startIndex, startIndex + eventosPorVez);
    eventosParaExibir.forEach((evento) => {
      const cardElement = criarCardEvento(evento);
      wrapperElement?.appendChild(cardElement);
      eventosExibidos = true; // Indica que pelo menos um evento foi exibido
    });

    const todosEventosExibidos =
      id === "eventosFiltrados" ? eventosExibidosId1 : eventosExibidosId2;
    if (todosEventosExibidos >= eventos.length) {
      const mostrarMaisBtn = document.querySelector(".mostrarMais");
      if (mostrarMaisBtn) mostrarMaisBtn.style.display = "none";
    }

    if (id === "eventosFiltrados" && !eventosExibidos) {
      const mensagemElement = document.createElement("p");
      mensagemElement.textContent =
        "Não existem eventos próximos para a localização escolhida.";
      wrapperElement.appendChild(mensagemElement);
    }

    if (id === "eventosFiltrados") {
      state.eventosExibidosId1 += eventosPorVez;
    } else if (id === "todosEventos") {
      state.eventosExibidosId2 += eventosPorVez;
    }
  }

  function isEventoProximo(evento, userLocation) {
    if (!userLocation) return false;

    const { latitude: userLat, longitude: userLng } = userLocation;
    const { latitude: eventoLat, longitude: eventoLng } = evento;

    const distanciaKm = calcularDistancia(
      userLat,
      userLng,
      eventoLat,
      eventoLng
    );
    return distanciaKm <= raioMaximoKm;
  }

  function calcularDistancia(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;
    return distancia;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function criarCardEvento(evento) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("cards");
    cardElement.dataset.id = evento.id;

    const dataHoraFormatada = formatarDataHora(
      evento.startDate,
      evento.startTime
    );

    let detalheExtra = "";
    if (evento.tipo === "presencial") {
      detalheExtra = `<p><img src="./assets/img/local.svg" alt="Local do evento" />${evento.local}</p>`;
    } else if (evento.tipo === "online") {
      detalheExtra = `<p><img src="./assets/img/local.svg" alt="Link do evento" />${evento.link}</p>`;
    } else {
      console.error("Tipo de evento desconhecido:", evento.tipo);
      return null;
    }

    cardElement.innerHTML = `
      <img class="banner-card" src="${evento.bannerURL}" alt="banner do evento" />
      <p class="event-title">${evento.nome}</p>
      <p><img src="./assets/img/data.svg" alt="Data e Horário do evento" />${dataHoraFormatada}</p>
      ${detalheExtra}
    `;

    cardElement.addEventListener("click", () => {
      window.location.href = `detalhes-evento.html?id=${evento.id}`;
    });

    return cardElement;
  }

  function formatarDataHora(startDate, startTime) {
    return `${startDate} ${startTime}`;
  }

  obterEventos();

  const mostrarMaisBtn = document.querySelector(".mostrarMais");
  if (mostrarMaisBtn) {
    mostrarMaisBtn.addEventListener("click", () => {
      exibirEventos("todosEventos");
      if (estaEmEventosProximos()) {
        exibirEventos("eventosFiltrados");
      }
    });
  }
});
