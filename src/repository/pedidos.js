const knex = require('../services/conexao');

const atualizarEstoque = async (id, valor) =>
  await knex.raw(
    `UPDATE produtos SET quantidade_estoque = quantidade_estoque - ? WHERE id = ?`,
    [valor, id]
  );

const cadastrarPedido = async (pedido, valor_total) => {
  const pedidoCadastrado = await knex('pedidos')
    .insert({
      cliente_id: pedido.cliente_id,
      observacao: pedido.observacao,
      valor_total,
    })
    .returning('*');

  const listaProdutosCadastrados = [];
  for (const produto of pedido.pedido_produtos) {
    const produto_pedido = await knex('pedido_produtos')
      .insert({
        pedido_id: pedidoCadastrado[0].id,
        produto_id: produto.produto_id,
        quantidade_produto: produto.quantidade_produto,
        valor_produto: produto.valor,
      })
      .returning('*');

    await atualizarEstoque(produto.produto_id, produto.quantidade_produto);

    listaProdutosCadastrados.push(produto_pedido);
  }

  const pedidoFinal = {
    pedido: pedidoCadastrado[0],
    produtos: listaProdutosCadastrados,
  };

  return pedidoFinal;
};

module.exports = cadastrarPedido;
