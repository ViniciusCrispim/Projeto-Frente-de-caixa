const knex = require('../services/conexao');

const cadastrarPedido = async (pedido, valor_total) => {
  return await knex.transaction(async (trx) => {
    const [pedidoCadastrado] = await trx('pedidos')
      .insert({
        cliente_id: pedido.cliente_id,
        observacao: pedido.observacao || null,
        valor_total,
      })
      .returning('*');

    const listaProdutosCadastrados = [];

    for (const produto of pedido.pedido_produtos) {
      const [produtoPedido] = await trx('pedido_produtos')
        .insert({
          pedido_id: pedidoCadastrado.id,
          produto_id: produto.produto_id,
          quantidade_produto: produto.quantidade_produto,
          valor_produto: produto.valor,
        })
        .returning('*');

      await trx('produtos')
        .where({ id: produto.produto_id })
        .decrement('quantidade_estoque', produto.quantidade_produto);

      listaProdutosCadastrados.push(produtoPedido);
    }

    return {
      pedido: pedidoCadastrado,
      pedido_produtos: listaProdutosCadastrados,
    };
  });
};

const buscarPedidos = async (cliente_id) => {
  const consultaPedidos = knex('pedidos').orderBy('id', 'asc');
  if (cliente_id) {
    consultaPedidos.where({ cliente_id });
  }

  const pedidos = await consultaPedidos;
  if (pedidos.length === 0) {
    return [];
  }

  const idsPedidos = pedidos.map((p) => p.id);
  const todosProdutosPedido = await knex('pedido_produtos')
    .whereIn('pedido_id', idsPedidos)
    .orderBy('id', 'asc');

  return pedidos.map((pedido) => ({
    pedido: {
      id: pedido.id,
      valor_total: pedido.valor_total,
      observacao: pedido.observacao,
      cliente_id: pedido.cliente_id,
    },
    pedido_produtos: todosProdutosPedido
      .filter((item) => item.pedido_id === pedido.id)
      .map((item) => ({
        id: item.id,
        quantidade_produto: item.quantidade_produto,
        valor_produto: item.valor_produto,
        pedido_id: item.pedido_id,
        produto_id: item.produto_id,
      })),
  }));
};

module.exports = { cadastrarPedido, buscarPedidos };
