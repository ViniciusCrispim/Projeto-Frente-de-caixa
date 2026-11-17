const nodemailer = require('nodemailer');

const criarTransportador = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'in-v3.mailjet.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const enviarEmailPedido = async (cliente, pedido, itensDetalhados) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return;
  }

  const transportador = criarTransportador();
  const valorReais = (pedido.valor_total / 100).toFixed(2).replace('.', ',');

  const resumoItens = itensDetalhados
    .map(
      (item) =>
        `- ${item.descricao}: ${item.quantidade_produto}x (R$ ${(
          item.valor_produto / 100
        )
          .toFixed(2)
          .replace('.', ',')})`
    )
    .join('\n');

  await transportador.sendMail({
    from: process.env.EMAIL_FROM || 'pdv@cubos.academy',
    to: cliente.email,
    subject: `Pedido #${pedido.id} realizado com sucesso!`,
    text: `Olá, ${cliente.nome}!\n\nSeu pedido #${pedido.id} foi cadastrado com sucesso.\n\nItens do pedido:\n${resumoItens}\n\nValor total: R$ ${valorReais}`,
  });
};

module.exports = { enviarEmailPedido };
