const { Router } = require("express");
const {
  getRegistros,
  cadastrarUsuario,
  login,
  criandoAcesso,
} = require("./controller.js");

const router = Router();

rotas.post("/login", login);

router.get("/", getRegistros);

router.post("/usuario", cadastrarUsuario);

router.post("/criadoAcesso", criandoAcesso);

module.exports = router;
