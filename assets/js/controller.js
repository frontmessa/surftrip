const pool = require('./db.js');

const getRegistros = (req, res) => {
    pool.query("SELECT nome, telefone, email FROM registros", (error, results) => {
        if (error) throw error;
        res.render('/registros', { registros: results.rows });
      });
 };

 module.exports = {
    getRegistros,
 }