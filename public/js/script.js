const API = "/atividades";

const form = document.getElementById("formAtividade");
const lista = document.getElementById("listaAtividades");

async function carregarAtividades() {
  const resposta = await fetch(API);
  const atividades = await resposta.json();

  lista.innerHTML = "";

  atividades.forEach(atividade => {

    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${atividade.titulo}</h3>
      <p><strong>Descrição:</strong> ${atividade.descricao}</p>
      <p><strong>Data:</strong> ${atividade.data}</p>
      <p><strong>Horário:</strong> ${atividade.horario}</p>
      <p><strong>Status:</strong> ${atividade.status}</p>

      <button onclick="editar(${atividade.id})">
        Editar
      </button>

      <button onclick="excluir(${atividade.id})">
        Excluir
      </button>
    `;

    lista.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;

  const atividade = {
    titulo: document.getElementById("titulo").value,
    descricao: document.getElementById("descricao").value,
    data: document.getElementById("data").value,
    horario: document.getElementById("horario").value,
    prioridade: document.getElementById("prioridade").value,
    status: document.getElementById("status").value
  };

  if (id) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(atividade)
    });
  } else {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(atividade)
    });
  }

  form.reset();
  document.getElementById("id").value = "";

  carregarAtividades();
});

async function editar(id) {
  const resposta = await fetch(API);
  const atividades = await resposta.json();

  const atividade = atividades.find(a => a.id === id);

  document.getElementById("id").value = atividade.id;
  document.getElementById("titulo").value = atividade.titulo;
  document.getElementById("descricao").value = atividade.descricao;
  document.getElementById("data").value = atividade.data;
  document.getElementById("horario").value = atividade.horario;
  document.getElementById("prioridade").value = atividade.prioridade;
  document.getElementById("status").value = atividade.status;
}

async function excluir(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  carregarAtividades();
}

carregarAtividades();