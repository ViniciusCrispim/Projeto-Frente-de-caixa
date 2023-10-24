const knex = require('../services/conexao');
const bcrypt = require('bcrypt');

const buscarUsuarioPorEmail = async (email) => {
  const usuarioCadastrado = await knex('usuarios').where({ email }).first();
  if (!usuarioCadastrado) {
    return false;
  }
  return usuarioCadastrado;
};

const buscarUsuarioPorId = async (id) => {
  const usuarioSistema = await knex('usuarios')
    .select(['id', 'nome', 'email'])
    .where({ id })
    .first();
  if (!usuarioSistema) {
    return false;
  }
  return usuarioSistema;
};

const cadastrarUsuario = async (nome, email, senha) => {
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const usuarioCadastrado = await knex('usuarios')
    .insert({
      nome,
      email,
      senha: senhaCriptografada,
    })
    .returning(['id', 'nome', 'email']);

  return usuarioCadastrado;
};

const atualizarUsuario = async (id, nome, email, senha) => {
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const usuarioAtualizado = await knex('usuarios')
    .update({ nome, email, senha: senhaCriptografada })
    .where({ id })
    .returning(['id', 'nome', 'email']);

  return usuarioAtualizado;
};

module.exports = {
  cadastrarUsuario,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  atualizarUsuario,
};
