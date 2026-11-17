const Joi = require('joi');

const esquemaListaPedidos = Joi.object({
  produto_id: Joi.number().integer().positive().required().messages({
    'any.required': 'O campo (produto_id) é obrigatório',
    'number.base': 'O campo (produto_id) deve ser um número',
    'number.integer': 'O campo (produto_id) deve ser um número inteiro',
    'number.positive': 'O campo (produto_id) deve ser um número positivo',
  }),
  quantidade_produto: Joi.number().integer().min(1).required().messages({
    'any.required': 'O campo (quantidade_produto) é obrigatório',
    'number.base': 'O campo (quantidade_produto) deve ser um número',
    'number.integer': 'O campo (quantidade_produto) deve ser um número inteiro',
    'number.min': 'O campo (quantidade_produto) deve ser no mínimo 1',
  }),
});

const esquemaPedido = Joi.object({
  cliente_id: Joi.number().integer().positive().required().messages({
    'any.required': 'O campo (cliente_id) é obrigatório',
    'number.base': 'O campo (cliente_id) deve ser um número',
    'number.integer': 'O campo (cliente_id) deve ser um número inteiro',
    'number.positive': 'O campo (cliente_id) deve ser um número positivo',
  }),
  observacao: Joi.string().allow('', null),
  pedido_produtos: Joi.array()
    .min(1)
    .items(esquemaListaPedidos)
    .required()
    .messages({
      'any.required': 'O campo (pedido_produtos) é obrigatório',
      'array.base': 'O campo (pedido_produtos) deve ser um array',
      'array.min': 'O pedido deve conter ao menos 1 item',
    }),
});

module.exports = esquemaPedido;
