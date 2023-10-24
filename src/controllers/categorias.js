const buscarCategorias = require('../repository/categorias');

const listarCategorias = async (req, res) => {
  try {
    const categorias = await buscarCategorias();
    return res.json(categorias);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = listarCategorias;
