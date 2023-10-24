const jwt = require('jsonwebtoken');
const { buscarUsuarioPorId } = require('../repository/usuarios');

const autenticarAcesso = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ mensagem: 'Usuário não autenticado' });
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const conteudoToken = jwt.verify(token, process.env.JWT_PASS);

    if (!(await buscarUsuarioPorId(conteudoToken.id))) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    req.usuarioLogado = {
      id: conteudoToken.id,
      nome: conteudoToken.nome,
      email: conteudoToken.email,
    };

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = autenticarAcesso;
