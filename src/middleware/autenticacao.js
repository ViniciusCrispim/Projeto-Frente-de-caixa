const jwt = require('jsonwebtoken');
const { buscarUsuarioPorId } = require('../repository/usuarios');

const autenticarAcesso = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      mensagem:
        'Para acessar este recurso um token de autenticação válido deve ser enviado.',
    });
  }

  try {
    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        mensagem:
          'Para acessar este recurso um token de autenticação válido deve ser enviado.',
      });
    }

    const conteudoToken = jwt.verify(token, process.env.JWT_PASS);
    const usuario = await buscarUsuarioPorId(conteudoToken.id);

    if (!usuario) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado' });
    }

    req.usuarioLogado = usuario;

    next();
  } catch (error) {
    return res.status(401).json({
      mensagem:
        'Para acessar este recurso um token de autenticação válido deve ser enviado.',
    });
  }
};

module.exports = autenticarAcesso;
