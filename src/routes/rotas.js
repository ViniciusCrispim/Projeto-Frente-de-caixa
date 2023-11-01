const { Router } = require('express');

const rotaCategorias = require('./rota.categorias');
const rotaUsuarios = require('./rota.usuarios');
const rotaLogin = require('./rota.login');
const autenticarAcesso = require('../middleware/autenticacao');
const rotaProdutos = require('./rota.produtos');
const rotaClientes = require('./rota.clientes');
const rotaPedidos = require('./rota.pedidos');

const rotas = Router();

rotas.use(rotaCategorias);
rotas.use(rotaUsuarios);
rotas.use(rotaLogin);
rotas.use(autenticarAcesso);
rotas.use('/produto', rotaProdutos);
rotas.use('/cliente', rotaClientes);
rotas.use('/pedido', rotaPedidos);

module.exports = rotas;
