const Joi = require('Joi');

const esquemaLogin = Joi.object({
  email: Joi.string().required().email().messages({
    'any.required': 'O campo (email) deve ser informado',
    'string.empty': 'O campo (email) deve ser preenchido',
    'string.email': 'O insira um e-mail válido',
  }),
  senha: Joi.string().required().messages({
    'any.required': 'O campo (senha) deve ser informado',
    'string.empty': 'O campo (senha) deve ser preenchido',
  }),
});

module.exports = esquemaLogin;
