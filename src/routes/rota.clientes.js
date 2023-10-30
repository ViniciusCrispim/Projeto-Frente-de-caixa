const { Router } = require('express');
const {
  cadastroCliente,
  editarCliente,
  listarClientes,
  detalharCliente,
} = require('../controllers/clientes');
const {
  validarCorpoRequisicao,
  validarEmailCpfCliente,
  validarClienteId,
} = require('../middleware/validacao');
const esquemaCliente = require('../schemas/clientes');
const rotaClientes = Router();

rotaClientes.post(
  '/',
  validarCorpoRequisicao(esquemaCliente),
  validarEmailCpfCliente,
  cadastroCliente
);

rotaClientes.put(
  '/:id',
  validarCorpoRequisicao(esquemaCliente),
  validarClienteId,
  editarCliente
);

rotaClientes.get('/', listarClientes);

rotaClientes.get('/:id', validarClienteId, detalharCliente);

module.exports = rotaClientes;
