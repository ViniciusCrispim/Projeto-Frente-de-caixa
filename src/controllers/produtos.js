const {
  verificarIdCategoria,
  cadastrarProduto,
} = require('../repository/produtos');

const cadastroProduto = async (req, res) => {
  const bodyProduto = req.body;
  console.log(bodyProduto);

  try {
    if (!(await verificarIdCategoria(bodyProduto.categoria_id))) {
      return res
        .status(400)
        .json({ mensagem: 'O id da categoria informada não existe' });
    }

    const produtoCadastrado = await cadastrarProduto(bodyProduto);
    return res.status(201).json(produtoCadastrado[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastroProduto,
};
