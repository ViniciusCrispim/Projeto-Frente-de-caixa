const { Router } = require('express');
const { validarCorpoRequisicao } = require('../middleware/validacao');
const esquemaLogin = require('../schemas/login');
const fazerLogin = require('../controllers/login');

const rotaLogin = Router();

rotaLogin
  .route('/login')
  .post(validarCorpoRequisicao(esquemaLogin), fazerLogin);

module.exports = rotaLogin;
