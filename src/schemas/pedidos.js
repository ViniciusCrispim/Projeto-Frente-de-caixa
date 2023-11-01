const Joi = require('joi');

const esquemaListaPedidos = Joi.object({
  produto_id: Joi.number().integer().positive().required().messages({
    'any.required': 'O campo (produto_id) é obrigatório',
  }),
  quantidade_produto: Joi.number().integer().min(1).required().messages({
    'any.required': 'O campo (quantidade_produto) é obrigatório',
  }),
});

const esquemaPedido = Joi.object({
  cliente_id: Joi.number().required().messages({
    'any.required': 'O campo (cliente_id) é obrigatório',
  }),
  observacao: Joi.string(),
  pedido_produtos: Joi.array()
    .min(1)
    .items(esquemaListaPedidos)
    .required()
    .messages({
      'any.required': 'O campo (pedido_produtos) é obrigatório',
      'array.min': 'O pedido deve conter ao menos 1 ítem',
    }),
});

module.exports = esquemaPedido;
