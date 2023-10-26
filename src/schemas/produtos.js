const Joi = require('joi');

const esquemaProduto = Joi.object({
  descricao: Joi.string().required().messages({
    'any.required': 'O campo (descricao) é obrigatório',
    'string.base': 'O campo (descricao) deve ser uma string',
    'string.empty': 'O campo (descricao) deve ser preenchido',
  }),
  quantidade_estoque: Joi.number().positive().required().messages({
    'any.required': 'O campo (quantidade_estoque) é obrigatório',
    'number.base': 'O campo (quantidade_estoque) deve ser um numero',
    'number.positive':
      'O campo (quantidade_estoque) deve ser um numero positivo',
  }),
  valor: Joi.number().positive().required().messages({
    'any.required': 'O campo (valor) é obrigatório',
    'number.base': 'O campo (valor) deve ser um numero',
    'number.positive': 'O campo (valor) deve ser um numero positivo',
  }),
  categoria_id: Joi.number().positive().required().messages({
    'any.required': 'O campo (categoria_id) é obrigatório',
    'number.base': 'O campo (categoria_id) deve ser um numero',
    'number.positive': 'O campo (categoria_id) deve ser um numero positivo',
  }),
});

module.exports = esquemaProduto;
