const Joi = require('joi');

const esquemaCliente = Joi.object({
  nome: Joi.string().required().messages({
    'any.required': 'O campo (nome) é obrigatório',
    'string.empty': 'O campo (nome) deve ser preenchido',
    'string.base': 'O campo (nome) deve ser uma string',
  }),
  email: Joi.string().required().email().messages({
    'any.required': 'O campo (email) é obrigatório',
    'string.email': 'O campo (email) deve conter um e-mail válido',
    'string.empty': 'O campo (email) deve ser preenchido',
  }),
  cpf: Joi.string().required().length(11).messages({
    'any.required': 'O campo (cpf) é obrigatório',
    'string.empty': 'O campo (cpf) deve ser preenchido',
    'string.base': 'O campo (cpf) deve ser uma string',
    'string.length': 'O campo (cpf) deve conter 11 dígitos',
  }),
});

module.exports = esquemaCliente;
