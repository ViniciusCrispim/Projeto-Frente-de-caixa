const {
  verificarIdCategoria,
  cadastrarProduto,
  buscarProdutos,
  atualizarProdutoDb,
  excluirProduto,
  buscarProdutoPorId,
  verificarProdutoEmPedido,
} = require('../repository/produtos');
const { uploadImagem, deletarImagem } = require('../services/storage');

const cadastroProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } =
    req.body;

  try {
    let urlImagem = produto_imagem || null;

    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;
      const imagemSalva = await uploadImagem(originalname, buffer, mimetype);
      urlImagem = imagemSalva.url;
    }

    const produtoCadastrado = await cadastrarProduto({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem: urlImagem,
    });

    return res.status(201).json(produtoCadastrado[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const atualizarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } =
    req.body;
  const { id } = req.params;

  try {
    const produtoExistente = req.produto || (await buscarProdutoPorId(id));
    let urlImagem =
      produto_imagem !== undefined
        ? produto_imagem
        : produtoExistente.produto_imagem;

    if (req.file) {
      if (produtoExistente.produto_imagem) {
        await deletarImagem(produtoExistente.produto_imagem);
      }
      const { originalname, buffer, mimetype } = req.file;
      const imagemSalva = await uploadImagem(originalname, buffer, mimetype);
      urlImagem = imagemSalva.url;
    }

    const produtoAtualizado = await atualizarProdutoDb(
      {
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: urlImagem,
      },
      id
    );

    if (!produtoAtualizado || produtoAtualizado.length === 0) {
      return res
        .status(500)
        .json({ mensagem: 'Erro ao atualizar, repita a operação' });
    }

    return res.json(produtoAtualizado[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    if (categoria_id) {
      const categoriaExiste = await verificarIdCategoria(categoria_id);
      if (!categoriaExiste) {
        return res
          .status(404)
          .json({ mensagem: 'Não existe categoria para o id informado' });
      }
    }

    const listaProdutos = await buscarProdutos(categoria_id);
    return res.json(listaProdutos);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produtoVinculado = await verificarProdutoEmPedido(id);
    if (produtoVinculado) {
      return res.status(400).json({
        mensagem:
          'O produto não pode ser excluído pois está vinculado a um pedido registrado',
      });
    }

    const produtoExistente = req.produto || (await buscarProdutoPorId(id));
    if (produtoExistente && produtoExistente.produto_imagem) {
      await deletarImagem(produtoExistente.produto_imagem);
    }

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
    const produtoDetalhado = req.produto || (await buscarProdutoPorId(id));
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
