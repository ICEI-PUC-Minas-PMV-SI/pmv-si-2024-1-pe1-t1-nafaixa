var email = "";

function validarCodigo() {
  const codigo = new URLSearchParams(document.location.search).get("codigo");
  fetch("http://localhost:3000/codigos-de-validacao/" + codigo, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Houve um erro na requisição " + response.statusText);
      }
      return response.json();
    })
    .then((codigoDeValidacao) => {
      console.log("email é", codigoDeValidacao.email);
      email = codigoDeValidacao.email;
    });
}
validarCodigo();

function hashPassword(password) {
  return CryptoJS.MD5(password).toString();
}

function salvarNovaSenha(novaSenha, idProdutor) {
  const senhaHasheada = hashPassword(novaSenha);
  fetch("http://localhost:3000/produtor/" + idProdutor, {
    method: "PATCH",
    body: JSON.stringify({
      senha: senhaHasheada,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => {
    window.location.href = "login.html";
    alert("Sua senha foi salva! Faça login por favor");
  });
}

function cadastrarNovaSenha(event) {
  const novaSenhaConfirmacao = document.getElementById(
    "confirm-new-password"
  ).value;
  const novaSenha = document.getElementById("new-password").value;
  if (novaSenha !== novaSenhaConfirmacao) {
    alert("As senhas não são iguais!");
    return;
  }
  console.log("email", email);
  fetch("http://localhost:3000/produtor?email=" + email, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (respostaFormatada) {
      const produtor = respostaFormatada[0];
      const id = produtor.id;
      salvarNovaSenha(novaSenha, id).then((res) => event.preventDefault());
    });
}
