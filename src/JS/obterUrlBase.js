function obterUrlBase() {
  const estaLocalmente =
    window.location.hostname == "localhost" ||
    window.location.hostname == "127.0.0.1";
  const baseUrl = estaLocalmente
    ? "http://localhost:3000"
    : "https://na-faixa-backend-ba6af9478806.herokuapp.com";
  return baseUrl;
}
