const {
  cadastrarUsuario,
  buscarUsuarioPorId,
  buscarUsuarioPorEmail,
  atualizarUsuario,
} = require('../repository/usuarios');

const cadastroUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const usuarioCadastrado = await cadastrarUsuario(nome, email, senha);
    return res.status(201).json(usuarioCadastrado[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detalharUsuario = async (req, res) => {
  try {
    return res.json(req.usuarioLogado);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const atualizacaoUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuarioLogado;
  try {
    const usuarioCadastrado = await buscarUsuarioPorId(id);
    if (!usuarioCadastrado) {
      return res.status(404).json({ mensagem: 'Usuario não encontrado' });
    }

    if (
      email !== usuarioCadastrado.email &&
      (await buscarUsuarioPorEmail(email))
    ) {
      return res
        .status(403)
        .json({ mensagem: 'O email informado já está em uso' });
    }

    const usuarioAtualizado = await atualizarUsuario(id, nome, email, senha);
    if (!usuarioAtualizado) {
      return res
        .status(500)
        .json({ mensagem: 'Erro na atualização, tente novamente' });
    }

    return res.json(usuarioAtualizado[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = { cadastroUsuario, detalharUsuario, atualizacaoUsuario };
