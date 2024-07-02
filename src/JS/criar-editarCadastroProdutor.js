// Preview da foto do produtor
const eventBannerInput = document.querySelector("#foto-produtor");
const eventBannerPreview = document.querySelector("#foto-produtor-preview");

eventBannerInput.onchange = (evt) => {
  const [file] = eventBannerInput.files;
  if (file) {
    eventBannerPreview.src = URL.createObjectURL(file);
  }
  eventBannerPreview.style.display = "block";
};

function hashPassword(password) {
  return CryptoJS.MD5(password).toString();
}

async function criarProdutor() {
  const url = obterUrlBase() + "/produtor";

  const nomeProdutor = document.querySelector("#produtor-nome");
  const identificacaoProdutor = document.querySelector("#produtor-identificacao");
  const celularProdutor = document.querySelector("#produtor-celular");
  const cidadeProdutor = document.querySelector("#produtor-cidade");
  const estadoProdutor = document.querySelector("#produtor-estado");
  const emailProdutor = document.querySelector("#produtor-email");
  const sobreProdutor = document.querySelector("#produtor-sobre");
  const emailPublico = document.querySelector("#email-publico");
  const celularPublico = document.querySelector("#celular-publico");
  const aceitoTermos = document.querySelector("#aceito-termos");
  const senha = document.querySelector("#criar-senha");
  const senhaHash = hashPassword(senha.value);

  const fotoProdutorInput = document.querySelector("#foto-produtor");
  const fotoProdutorFile = fotoProdutorInput.files[0];

  // Cloudinary config
  const cloudName = "CLOUDINARY_CHAVE_API";
  const unsignedUploadPreset = "w1cukmci";

  const formData = new FormData();
  formData.append("file", fotoProdutorFile);
  formData.append("upload_preset", unsignedUploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro ao fazer upload da imagem para o Cloudinary. Status: ${response.status}`);
    }

    const data = await response.json();
    const fotoProdutorURL = data.secure_url;

    const payload = {
      id: uuid.v4(),
      nome: nomeProdutor.value,
      cpf: identificacaoProdutor.value,
      celular: celularProdutor.value,
      cidade: cidadeProdutor.value,
      estado: estadoProdutor.value,
      email: emailProdutor.value,
      senha: senhaHash,
      logo: fotoProdutorURL,
      descricao: sobreProdutor.value,
      email_publico: emailPublico.value,
      celular_publico: celularPublico.value,
    };

    const responseCadastro = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!responseCadastro.ok) {
      throw new Error(`Erro ao cadastrar o produtor. Status: ${responseCadastro.status}`);
    }

    const dataCadastro = await responseCadastro.json();
    console.log(dataCadastro);
    alert("Seu cadastro foi realizado com sucesso.");
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro em concluir o cadastro. Por favor tente mais tarde.");
  }
  window.location.href = "login.html";
}

function verificarCampos() {
  const primeiraSenha = document.querySelector("#criar-senha").value;
  const segundaSenha = document.querySelector("#repita-senha").value;

  if (isEditMode()) {
    return true;
  }

  if (primeiraSenha !== segundaSenha) {
    alert("As senhas não coincidem. Por favor, digite novamente.");
    return false;
  }

  const camposObrigatorios = document.querySelectorAll(".form-produtor input[required]");
  for (let campo of camposObrigatorios) {
    if (!campo.value) {
      alert(`O campo ${campo.name} é obrigatório.`);
      campo.focus();
      return false;
    }
  }
  if (!document.querySelector("#aceito-termos").checked) {
    alert("Você deve aceitar os termos de uso para se cadastrar.");
    return false;
  }

  criarProdutor();
}

async function verificarDuplicatas(cpf, email) {
  if (isEditMode()) {
    return true;
  }
  try {
    const response = await fetch(obterUrlBase() + "/produtor");
    const dataDuplicata = await response.json();

    for (let produtor of dataDuplicata) {
      if (produtor.cpf == cpf) {
        alert("CPF já cadastrado. Por favor, insira um CPF diferente.");
        return false;
      }
      if (produtor.email == email) {
        alert("E-mail já cadastrado. Por favor, insira um e-mail diferente.");
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Erro ao verificar duplicatas:", error);
    return false;
  }
}

document.querySelector(".button-criar").addEventListener("click", async function () {
  const cpf = document.querySelector("#produtor-identificacao").value;
  const email = document.querySelector("#produtor-email").value;

  const duplicatas = await verificarDuplicatas(cpf, email);

  if (duplicatas) {
    verificarCampos();
  }
});

// Edição do cadastro do produtor
function isEditMode() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('edit');
}

async function preencherDadosProdutor() {
  try {
    const response = await fetch(obterUrlBase() + `/produtor/${localStorage.getItem('userData')}`);
    const produtor = await response.json();

    document.querySelector("#produtor-nome").value = produtor.nome;
    document.querySelector("#produtor-identificacao").value = produtor.cpf;
    document.querySelector("#produtor-celular").value = produtor.celular;
    document.querySelector("#produtor-cidade").value = produtor.cidade;
    document.querySelector("#produtor-estado").value = produtor.estado;
    document.querySelector("#produtor-email").value = produtor.email;
    document.querySelector("#produtor-sobre").value = produtor.descricao;
    document.querySelector("#email-publico").value = produtor.email_publico;
    document.querySelector("#celular-publico").value = produtor.celular_publico;
    document.querySelector("#foto-produtor-preview").src = produtor.logo;
    document.querySelector("#foto-produtor-preview").style.display = "block";

  } catch (error) {
    console.error("Erro ao preencher dados do produtor:", error);
    alert("Erro ao preencher dados do produtor. Por favor, tente novamente mais tarde.");
  }
}

async function salvarAlteracoes() {
  const url = obterUrlBase() + `/produtor/${localStorage.getItem('userData')}`;
  const senha = document.querySelector("#criar-senha").value;
  let senhaHash = null;

  if (senha) {
    senhaHash = hashPassword(senha);
  }

  const nomeProdutor = document.querySelector("#produtor-nome").value;
  const identificacaoProdutor = document.querySelector("#produtor-identificacao").value;
  const celularProdutor = document.querySelector("#produtor-celular").value;
  const cidadeProdutor = document.querySelector("#produtor-cidade").value;
  const estadoProdutor = document.querySelector("#produtor-estado").value;
  const emailProdutor = document.querySelector("#produtor-email").value;
  const sobreProdutor = document.querySelector("#produtor-sobre").value;
  const emailPublico = document.querySelector("#email-publico").value;
  const celularPublico = document.querySelector("#celular-publico").value;

  const fotoProdutorInput = document.querySelector("#foto-produtor");
  const fotoProdutorFile = fotoProdutorInput.files[0];

  const cloudName = "CLOUDINARY_CHAVE_API";
  const unsignedUploadPreset = "w1cukmci";

  let produtorAtual;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao obter os dados atuais do produtor. Status: ${response.status}`);
    }
    produtorAtual = await response.json();
  } catch (error) {
    console.error("Erro ao obter os dados atuais do produtor:", error);
    alert("Erro ao obter os dados atuais do produtor. Por favor, tente novamente mais tarde.");
    return;
  }

  const payload = {
    nome: nomeProdutor,
    cpf: identificacaoProdutor,
    celular: celularProdutor,
    cidade: cidadeProdutor,
    estado: estadoProdutor,
    email: emailProdutor,
    descricao: sobreProdutor,
    email_publico: emailPublico,
    celular_publico: celularPublico,
    logo: produtorAtual.logo,
  };

  if (senhaHash) {
    payload.senha = senhaHash;
  }

  if (fotoProdutorFile) {
    const formData = new FormData();
    formData.append("file", fotoProdutorFile);
    formData.append("upload_preset", unsignedUploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erro ao fazer upload da imagem para o Cloudinary. Status: ${response.status}`);
      }

      const data = await response.json();
      payload.logo = data.secure_url;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      alert("Erro ao fazer upload da imagem. Por favor, tente novamente mais tarde.");
      return;
    }
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar os dados do produtor. Status: ${response.status}`);
    }

    alert("Dados atualizados com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar alterações:", error);
    alert("Erro ao salvar alterações. Por favor, tente novamente mais tarde.");
  }
}


document.addEventListener("DOMContentLoaded", async function () {
  if (isEditMode()) {
    await preencherDadosProdutor();
    const buttonCriar = document.querySelector(".button-criar");
    buttonCriar.textContent = "Salvar Alterações";
    buttonCriar.removeEventListener("click", verificarCampos);
    buttonCriar.addEventListener("click", salvarAlteracoes);

    const senhaContainer = document.getElementById("senha-container");
    senhaContainer.style.display = "none";
    const repitaSenhaContainer = document.getElementById("repita-senha-container");
    repitaSenhaContainer.style.display = "none";

    const aceitarTermosUso = document.querySelector('.termos-uso');
    aceitarTermosUso.style.display = "none";
  }
});
