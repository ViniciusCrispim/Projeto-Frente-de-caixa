const { validarIdCliente } = require('../repository/clientes');
const { cadastrarPedido, buscarPedidos } = require('../repository/pedidos');
const { buscarProdutoPorId } = require('../repository/produtos');
const { enviarEmailPedido } = require('../services/email');

const cadastroPedido = async (req, res) => {
  const objetoPedido = req.body;
  try {
    const cliente = await validarIdCliente(objetoPedido.cliente_id);
    if (!cliente) {
      return res
        .status(404)
        .json({ mensagem: 'Não existe cliente com Id informado' });
    }

    let valorTotalPedido = 0;
    const controleEstoque = new Map();
    const itensDetalhados = [];

    for (const produto of objetoPedido.pedido_produtos) {
      const produtoDb = await buscarProdutoPorId(produto.produto_id);
      if (!produtoDb) {
        return res.status(404).json({
          mensagem: `O id do produto informado '${produto.produto_id}' não está vinculado a nenhum produto`,
        });
      }

      const estoqueAtual = controleEstoque.has(produto.produto_id)
        ? controleEstoque.get(produto.produto_id)
        : produtoDb.quantidade_estoque;

      if (produto.quantidade_produto > estoqueAtual) {
        return res.status(400).json({
          mensagem: `A quantidade em estoque do produto '${produtoDb.descricao}' é insuficiente para o pedido`,
        });
      }

      controleEstoque.set(
        produto.produto_id,
        estoqueAtual - produto.quantidade_produto
      );

      produto.valor = produtoDb.valor;
      valorTotalPedido += produtoDb.valor * produto.quantidade_produto;

      itensDetalhados.push({
        descricao: produtoDb.descricao,
        quantidade_produto: produto.quantidade_produto,
        valor_produto: produtoDb.valor,
      });
    }

    const pedidoCadastrado = await cadastrarPedido(
      objetoPedido,
      valorTotalPedido
    );

    try {
      await enviarEmailPedido(
        cliente,
        pedidoCadastrado.pedido,
        itensDetalhados
      );
    } catch (erroEmail) {
      console.error(
        'Pedido cadastrado, porém não foi possível enviar o e-mail:',
        erroEmail.message
      );
    }

    return res.status(201).json(pedidoCadastrado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    if (cliente_id) {
      const clienteExiste = await validarIdCliente(cliente_id);
      if (!clienteExiste) {
        return res
          .status(404)
          .json({ mensagem: 'Não existe cliente com Id informado' });
      }
    }

    const pedidos = await buscarPedidos(cliente_id);
    return res.json(pedidos);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = { cadastroPedido, listarPedidos };
