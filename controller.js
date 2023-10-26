const pool = require("./db.js");
const bcrypt = require("bcrypt");

const getRegistros = (req, res) => {
  pool.query(
    "SELECT nome, telefone, email FROM registros",
    (error, results) => {
      if (error) throw error;
      console.log(results.rows);
      res.render("tabela", { data: results.rows });
    }
  );
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await pool.query("select * from login where email = $1", [
      email,
    ]);

    if (usuario.rowCount < 1) {
      return res.status(404).json({ mensagem: "Email ou senha invalida" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!senhaValida) {
      return res.status(400).json({ mensagem: "Email ou senha invalida" });
    }

    const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, {
      expiresIn: "8h",
    });

    const { senha: _, ...usuarioLogado } = usuario.rows[0];

    return res.json({ usuario: usuarioLogado, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const criandoAcesso = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const resultado = await pool.query(
      "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *",
      [nome, email, senhaCriptografada]
    );
    return res.status(201).json(novoUsuario.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
const receberNovidadeCliente = async (req, res) => {
  const { nome, telefone, email } = req.body;

  try {
    const resultado = await pool.query(
      "INSERT INTO registros (nome, telefone, email) VALUES ($1, $2, $3)",
      [nome, telefone, email]
    );
    res.sendFile(path.join(__dirname, "public/index.html"));
  } catch (error) {
    console.log(error.message);
    res.send("ocorreu um erro. Tente novamente mais tarde, por favor");
  }
};

module.exports = {
  getRegistros,
  cadastrarUsuario,
  login,
  criandoAcesso,
  receberNovidadeCliente,
};
