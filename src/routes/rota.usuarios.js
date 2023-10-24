const { Router } = require('express');
const rotaUsuarios = Router();

const {
  validarCorpoRequisicao,
  validarEmailCadastrado,
} = require('../middleware/validacao');
const esquemaUsuario = require('../schemas/usuarios');
const ctrl = require('../controllers/usuarios');
const autenticarAcesso = require('../middleware/autenticacao');

rotaUsuarios
  .route('/usuario')
  .post(
    validarCorpoRequisicao(esquemaUsuario),
    validarEmailCadastrado,
    ctrl.cadastroUsuario
  )
  .get(autenticarAcesso, ctrl.detalharUsuario)
  .put(
    validarCorpoRequisicao(esquemaUsuario),
    autenticarAcesso,
    ctrl.atualizacaoUsuario
  );

module.exports = rotaUsuarios;
