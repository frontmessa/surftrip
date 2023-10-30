const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("./senhaJwt");
const path = require("path");
const { error } = require("console");



const getRegistros = (req, res) => {
  pool.query(
    "SELECT nome, telefone, email, idade FROM registros",
    (error, results) => {
      if (error) throw error;
      res.render("dash", { data: results.rows });
    }
  );
};

const login = async (req, res) => {
  console.log(req)

//   try {
//     const usuario = await pool.query("select * from login where email = $1", [
//       email,
//     ]);
//     res.sendFile(path.join(__dirname, "public/login.html"));

//     if (usuario.rowCount < 1) {
//       return res.send({ mensagem: "Email ou senha invalida" });
//     }

//     const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

//     if (!senhaValida) {
//       return res.send({ mensagem: "Email ou senha invalida" });
//     }

//     const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, {
//       expiresIn: "8h",
//     });

//     const { senha: _, ...usuarioLogado } = usuario.rows[0];

//     return res.json({ usuario: usuarioLogado, token });

    
//     next();
//   } catch (error) {
//     return res.send(error.message);
//   }
};

const criandoAcesso = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const resultado = await pool.query(
      "INSERT INTO login (nome, email, senha) VALUES ($1, $2, $3)",
      [nome, email, senhaCriptografada]
    );
    res.sendFile(path.join(__dirname, "public/criandoAcesso.html"));
  } catch (error) {
    return res.send({ mensagem: "Erro interno do servidor" });
  }
};
const cadastroCliente = async (req, res) => {
  const { nome, telefone, email, idade} = req.body;

  try {
    const resultado = await pool.query(
      "INSERT INTO registros (nome, telefone, email, idade) VALUES ($1, $2, $3, $4)",
      [nome, telefone, email, idade]
    );
    res.sendFile(path.join(__dirname, "public/index.html"));
  } catch (error) {
    console.log(error.message);
    return res.send("ocorreu um erro. Tente novamente mais tarde, por favor");
  }
};

module.exports = {
  getRegistros,
  login,
  criandoAcesso,
  cadastroCliente,
};
