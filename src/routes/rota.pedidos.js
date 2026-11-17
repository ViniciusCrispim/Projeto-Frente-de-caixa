const { Router } = require('express');
const { cadastroPedido, listarPedidos } = require('../controllers/pedidos');
const { validarCorpoRequisicao } = require('../middleware/validacao');
const esquemaPedido = require('../schemas/pedidos');
const rotaPedidos = Router();

rotaPedidos.post('/', validarCorpoRequisicao(esquemaPedido), cadastroPedido);
rotaPedidos.get('/', listarPedidos);

module.exports = rotaPedidos;
