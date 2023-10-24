const { Router } = require('express');
const listarCategorias = require('../controllers/categorias');

const rotaCategorias = Router();

rotaCategorias.route('/categoria').get(listarCategorias);

module.exports = rotaCategorias;
