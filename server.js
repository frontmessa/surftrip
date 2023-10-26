const express = require("express");
const pool = require("./db.js");
const registrosRoutes = require("./routes.js");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", receberNovidadeCliente);

app.use("/registros", registrosRoutes);

app.listen(5505);
