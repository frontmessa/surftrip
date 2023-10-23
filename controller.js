const pool = require('./db.js');

const getRegistros = (req, res) => {
    pool.query("SELECT nome, telefone, email FROM registros", (error, results) => {
        if (error) throw error;
        console.log(results.rows);
        res.render('tabela', {data:results.rows});
      });
 };

 module.exports = {
    getRegistros,
 }