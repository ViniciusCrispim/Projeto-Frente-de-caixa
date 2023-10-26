const { Router } = require('express');
const {
  cadastroProduto,
  listarProdutos,
  atualizarProduto,
} = require('../controllers/produtos');
const {
  validarProdutoId,
  validarCorpoRequisicao,
  validarIdCategoria,
} = require('../middleware/validacao');
const esquemaProduto = require('../schemas/produtos');
const rotaProdutos = Router();

rotaProdutos.post(
  '/',
  validarCorpoRequisicao(esquemaProduto),
  validarIdCategoria,
  cadastroProduto
);

rotaProdutos.put(
  '/:id',
  validarProdutoId,
  validarCorpoRequisicao(esquemaProduto),
  validarIdCategoria,
  atualizarProduto
);

rotaProdutos.get('/', listarProdutos);

module.exports = rotaProdutos;
