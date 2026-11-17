const { Router } = require('express');
const {
  cadastroProduto,
  listarProdutos,
  atualizarProduto,
  deletarProduto,
  detalharProduto,
} = require('../controllers/produtos');
const {
  validarProdutoId,
  validarCorpoRequisicao,
  validarIdCategoria,
} = require('../middleware/validacao');
const upload = require('../middleware/multer');
const esquemaProduto = require('../schemas/produtos');

const rotaProdutos = Router();

rotaProdutos.post(
  '/',
  upload.single('produto_imagem'),
  validarCorpoRequisicao(esquemaProduto),
  validarIdCategoria,
  cadastroProduto
);

rotaProdutos.put(
  '/:id',
  validarProdutoId,
  upload.single('produto_imagem'),
  validarCorpoRequisicao(esquemaProduto),
  validarIdCategoria,
  atualizarProduto
);

rotaProdutos.get('/:id', validarProdutoId, detalharProduto);

rotaProdutos.get('/', listarProdutos);

rotaProdutos.delete('/:id', validarProdutoId, deletarProduto);

module.exports = rotaProdutos;
