const knex = require('../services/conexao');

const buscarCategorias = async () => {
  const categorias = await knex('categorias');
  return categorias;
};

module.exports = buscarCategorias;
