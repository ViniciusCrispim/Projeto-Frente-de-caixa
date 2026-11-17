const Joi = require('joi');

const esquemaCliente = Joi.object({
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
  cpf: Joi.string().required().length(11).messages({
    'any.required': 'O campo (cpf) é obrigatório',
    'string.empty': 'O campo (cpf) deve ser preenchido',
    'string.base': 'O campo (cpf) deve ser uma string',
    'string.length': 'O campo (cpf) deve conter 11 dígitos',
  }),
  cep: Joi.string().allow('', null),
  rua: Joi.string().allow('', null),
  numero: Joi.alternatives().try(Joi.number().integer(), Joi.string()).allow('', null),
  bairro: Joi.string().allow('', null),
  cidade: Joi.string().allow('', null),
  estado: Joi.string().max(2).allow('', null),
});

module.exports = esquemaCliente;
