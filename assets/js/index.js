const express = require('express');
const pool = require('./conexao');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.post('/', async (req, res) => {
    const { nome, telefone, email } = req.body;
    try {
        const resultado = await pool.query('INSERT INTO registros (nome, telefone, email) VALUES ($1, $2, $3)', [nome, telefone, email]);
        res.json(resultado);
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(5502);
