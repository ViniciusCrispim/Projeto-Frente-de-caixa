const { Router } = require('express');
const { cadastroPedido } = require('../controllers/pedidos');
const { validarCorpoRequisicao } = require('../middleware/validacao');
const esquemaPedido = require('../schemas/pedidos');
const rotaPedidos = Router();

rotaPedidos.post('/', validarCorpoRequisicao(esquemaPedido), cadastroPedido);

module.exports = rotaPedidos;
