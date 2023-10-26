const {
  cadastrarProduto,
  buscarProdutos,
  atualizarProdutoDb,
  excluirProduto,
  buscarProdutoPorId,
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

const deletarProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoExcluido = await excluirProduto(id);
    if (!produtoExcluido) {
      return res
        .status(500)
        .json({ mensagem: 'Erro ao excluir produto, repita a operação' });
    }
    return res.json({ mensagem: 'Produto excluído com sucesso' });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const detalharProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoDetalhado = await buscarProdutoPorId(id);

    return res.json(produtoDetalhado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastroProduto,
  listarProdutos,
  atualizarProduto,
  deletarProduto,
  detalharProduto,
};
