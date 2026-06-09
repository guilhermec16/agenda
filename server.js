const express = require("express");
const atividades = require("./dados");

const app = express();
const PORT = 3068;

app.use(express.json());
app.use(express.static("public"));

app.get("/atividades", (req, res) => {
  res.json(atividades);
});

app.post("/atividades", (req, res) => {
  const novaAtividade = {
    id: Date.now(),
    ...req.body
  };

  atividades.push(novaAtividade);
  res.json(novaAtividade);
});

app.put("/atividades/:id", (req, res) => {
  const id = Number(req.params.id);

  const atividade = atividades.find(a => a.id === id);

  if (!atividade) {
    return res.status(404).json({ mensagem: "Não encontrada" });
  }

  atividade.titulo = req.body.titulo;
  atividade.descricao = req.body.descricao;
  atividade.data = req.body.data;
  atividade.horario = req.body.horario;
  atividade.prioridade = req.body.prioridade;
  atividade.status = req.body.status;

  res.json(atividade);
});

app.delete("/atividades/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = atividades.findIndex(a => a.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Não encontrada" });
  }

  atividades.splice(indice, 1);

  res.json({ mensagem: "Excluída" });
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3068");
});