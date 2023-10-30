const express = require("express");
const registrosRoutes = require("./rotas.js");
const ejs = require("ejs");
const verificarUsuarioLogado = require("./autentificacao.js");
const path = require("path");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/public/login.html");
});

// app.get("/registros", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/tabela.ejs"));
// });

app.get("/acesso", function (req, res) {
  res.sendFile(__dirname + "/public/criandoAcesso.html");
});

app.use(registrosRoutes);

app.listen(5505);
