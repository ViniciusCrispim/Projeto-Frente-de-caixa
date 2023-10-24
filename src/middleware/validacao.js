const { buscarUsuarioPorEmail } = require('../repository/usuarios');

const validarCorpoRequisicao = (esquema) => async (req, res, next) => {
  try {
    await esquema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const validarEmailCadastrado = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (await buscarUsuarioPorEmail(email)) {
      return res
        .status(400)
        .json({ mensagem: 'O email informado já está em uso' });
    }
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = { validarCorpoRequisicao, validarEmailCadastrado };
