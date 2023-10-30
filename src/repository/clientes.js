const knex = require('../services/conexao');

const validarEmailCliente = async (email) =>
  await knex('clientes').where({ email }).first();

const validarCpfCliente = async (cpf) =>
  await knex('clientes').where({ cpf }).first();

const validarIdCliente = async (id) =>
  await knex('clientes').where({ id }).first();

const cadastrarCliente = async (cliente) =>
  await knex('clientes').insert(cliente).returning('*');

const atualizarCliente = async (cliente, id) =>
  await knex('clientes').update(cliente).where({ id }).returning('*');

const buscarClientes = async () => await knex('clientes').orderBy('id', 'asc');

module.exports = {
  validarEmailCliente,
  cadastrarCliente,
  validarCpfCliente,
  validarIdCliente,
  atualizarCliente,
  buscarClientes,
};
