const knex = require('../services/conexao');

const verificarIdCategoria = async (categoria_id) =>
  await knex('categorias').where({ id: categoria_id }).first();

const cadastrarProduto = async (produto) =>
  await knex('produtos').insert(produto).returning('*');

const atualizarProdutoDb = async (produto, id) =>
  await knex('produtos').update(produto).where({ id }).returning('*');

const buscarProdutos = async () => await knex('produtos');

const buscarProdutoPorId = async (id) =>
  await knex('produtos').where({ id }).first();

const excluirProduto = async (id) =>
  await knex('produtos').where({ id }).delete();

module.exports = {
  verificarIdCategoria,
  cadastrarProduto,
  buscarProdutos,
  buscarProdutoPorId,
  atualizarProdutoDb,
  excluirProduto,
};
