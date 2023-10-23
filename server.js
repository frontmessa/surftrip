const express = require('express');
const pool = require('./db.js');
const registrosRoutes = require('./routes.js');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());

app.get('/teste', (req, res) => {
    res.send('teste1');
});

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/', async (req, res) => {

    const { nome, telefone, email } = req.body;

    try {
        const resultado = await pool.query('INSERT INTO registros (nome, telefone, email) VALUES ($1, $2, $3)', [nome, telefone, email]);
        res.json(resultado);
    } catch (error) {
        console.log(error.message);
        res.send('ocorreu um erro. Tente novamente mais tarde, por favor');
    }
});

app.use("/registros", registrosRoutes);

app.listen(5505);
