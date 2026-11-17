const Joi = require('joi');

const esquemaProduto = Joi.object({
  descricao: Joi.string().trim().required().messages({
    'any.required': 'O campo (descricao) é obrigatório',
    'string.base': 'O campo (descricao) deve ser uma string',
    'string.empty': 'O campo (descricao) deve ser preenchido',
  }),
  quantidade_estoque: Joi.number().integer().min(0).required().messages({
    'any.required': 'O campo (quantidade_estoque) é obrigatório',
    'number.base': 'O campo (quantidade_estoque) deve ser um número',
    'number.integer': 'O campo (quantidade_estoque) deve ser um número inteiro',
    'number.min': 'O campo (quantidade_estoque) não pode ser negativo',
  }),
  valor: Joi.number().integer().positive().required().messages({
    'any.required': 'O campo (valor) é obrigatório',
    'number.base': 'O campo (valor) deve ser um número',
    'number.integer': 'O campo (valor) deve ser representado em centavos (inteiro)',
    'number.positive': 'O campo (valor) deve ser um número positivo',
  }),
  categoria_id: Joi.number().integer().positive().required().messages({
    'any.required': 'O campo (categoria_id) é obrigatório',
    'number.base': 'O campo (categoria_id) deve ser um número',
    'number.integer': 'O campo (categoria_id) deve ser um número inteiro',
    'number.positive': 'O campo (categoria_id) deve ser um número positivo',
  }),
  produto_imagem: Joi.string().allow('', null),
});

module.exports = esquemaProduto;
