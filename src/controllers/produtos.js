const {
  cadastrarProduto,
  buscarProdutos,
  atualizarProdutoDb,
} = require('../repository/produtos');

const cadastroProduto = async (req, res) => {
  const bodyProduto = req.body;
  try {
    const produtoCadastrado = await cadastrarProduto(bodyProduto);
    return res.status(201).json(produtoCadastrado[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const atualizarProduto = async (req, res) => {
  const bodyProduto = req.body;
  const id = req.params.id;

  try {
    const produtoAtualizado = await atualizarProdutoDb(bodyProduto, id);
    if (!produtoAtualizado) {
      res
        .status(500)
        .json({ mensagem: 'Erro ao atualizar, repita a operação' });
    }
    res.json(produtoAtualizado[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarProdutos = async (req, res) => {
  try {
    const listaProdutos = await buscarProdutos();
    return res.json(listaProdutos);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastroProduto,
  listarProdutos,
  atualizarProduto,
};
