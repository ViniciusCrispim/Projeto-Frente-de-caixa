const knex = require('../services/conexao');

const verificarIdCategoria = async (categoria_id) => {
  return await knex('categorias').where({ id: categoria_id });
};

const cadastrarProduto = async (produto) =>
  await knex('produtos').insert(produto).returning('*');

module.exports = {
  verificarIdCategoria,
  cadastrarProduto,
};
