const functions = require("@google-cloud/functions-framework");

functions.http("enviar-email", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
    const email = req.query.email;
    const mensagem = req.query.mensagem;
    fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: "Bearer",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [
              {
                email: email,
                name: "Na Faixa",
              },
            ],
            subject: "Recuperação de senha",
          },
        ],
        content: [
          {
            type: "text/plain",
            value: mensagem,
          },
        ],
        from: {
          email: "ritalaura57@gmail.com",
          name: "Na faixa",
        },
      }),
    })
      .then((response) => {
        return response.body;
      })
      .then((resposta) => {
        res.send(resposta);
      })
      .catch((error) => {
        res.send(error);
        return console.error("Deu erro", error);
      });
  }
});
