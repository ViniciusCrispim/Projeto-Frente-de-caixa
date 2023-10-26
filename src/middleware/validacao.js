const {
  buscarProdutoPorId,
  verificarIdCategoria,
} = require('../repository/produtos');
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
    return res.status(500).json({ mensagem: error.message });
  }
};

const validarIdCategoria = async (req, res, next) => {
  const { categoria_id } = req.body;
  try {
    if (!(await verificarIdCategoria(categoria_id))) {
      return res
        .status(400)
        .json({ mensagem: 'O id da categoria informada não existe' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const validarProdutoId = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!(await buscarProdutoPorId(id))) {
      return res
        .status(404)
        .json({ mensagem: 'Não existe produto com o ID cadastrado' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  validarCorpoRequisicao,
  validarEmailCadastrado,
  validarProdutoId,
  validarIdCategoria,
};
