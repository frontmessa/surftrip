const { Router } = require("express");
const { verificarUsuarioLogado } = require("./autentificacao.js");
const {
  getRegistros,
  cadastroCliente,
  login,
  criandoAcesso,
} = require("./controller.js");

const rotas = Router();

// rotas.use(verificarUsuarioLogado);

rotas.post("/", cadastroCliente);

rotas.post("/login", login);

rotas.get("/registros", getRegistros);

rotas.post("/criandoAcesso", criandoAcesso);

module.exports = rotas;
