const { Router } = require('express');
const { cadastroProduto } = require('../controllers/produtos');
const rotaProdutos = Router();

rotaProdutos.route('/produto').post(cadastroProduto);

module.exports = rotaProdutos;
