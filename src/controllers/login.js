const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { buscarUsuarioPorEmail } = require('../repository/usuarios');

const fazerLogin = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuarioSistema = await buscarUsuarioPorEmail(email);
    if (!usuarioSistema) {
      return res.status(404).json({ mensagem: 'Email incorreto' });
    }

    const senhaAutenticada = await bcrypt.compare(senha, usuarioSistema.senha);
    if (!senhaAutenticada) {
      return res.status(400).json({ mensagem: 'Senha incorreta' });
    }

    const usuarioLogado = {
      id: usuarioSistema.id,
      nome: usuarioSistema.nome,
      email: usuarioSistema.email,
    };

    const token = await jwt.sign(usuarioLogado, process.env.JWT_PASS, {
      expiresIn: '1d',
    });

    res.usuario = usuarioLogado;

    return res.json({ usuarioLogado, token });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = fazerLogin;
