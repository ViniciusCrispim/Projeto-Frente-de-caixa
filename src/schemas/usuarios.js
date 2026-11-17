const Joi = require('joi');

const esquemaUsuario = Joi.object({
  nome: Joi.string().trim().required().messages({
    'any.required': 'O campo (nome) é obrigatório',
    'string.empty': 'O campo (nome) deve ser preenchido',
    'string.base': 'O campo (nome) deve ser uma string',
  }),
  email: Joi.string().required().email().messages({
    'any.required': 'O campo (email) é obrigatório',
    'string.email': 'O campo (email) deve conter um e-mail válido',
    'string.empty': 'O campo (email) deve ser preenchido',
    'string.base': 'O campo (email) deve ser uma string',
  }),
  senha: Joi.string().required().messages({
    'any.required': 'O campo (senha) é obrigatório',
    'string.empty': 'O campo (senha) deve ser preenchido',
    'string.base': 'O campo (senha) deve ser uma string',
  }),
});

module.exports = esquemaUsuario;
