const Joi = require('joi');

const esquemaUsuario = Joi.object({
  nome: Joi.string().required().alphanum().messages({
    'any.required': 'O campo (nome) é obrigatório',
    'string.empty': 'O campo (nome) deve ser preenchido',
    'string.base': 'O campo (nome) deve ser uma string',
    'string.alphanum':
      'O campo (nome) deve conter caracteres alfanuméricos (a-Z, 0-9)',
  }),
  email: Joi.string().required().email().messages({
    'any.required': 'O campo (email) é obrigatório',
    'string.email': 'O campo (email) deve conter um e-mail válido',
    'string.empty': 'O campo(email) deve ser preenchido',
    'string.base': 'O campo (email) deve ser uma string',
  }),
  senha: Joi.string().required().min(6).max(12).messages({
    'any.required': 'O campo (senha) é obrigatório',
    'string.empty': 'O campo (senha) deve ser preenchido',
    'string.base': 'O campo (senha) deve ser uma string',
    'string.min': 'O campo (senha) deve conter no mínimo 6 caracteres',
    'string.max': 'O campo (senha) deve conter no máximo 12 caracteres',
  }),
});

module.exports = esquemaUsuario;
