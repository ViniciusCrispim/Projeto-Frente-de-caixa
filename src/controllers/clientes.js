const {
  cadastrarCliente,
  validarEmailCliente,
  validarCpfCliente,
  atualizarCliente,
  validarIdCliente,
  buscarClientes,
} = require('../repository/clientes');

const cadastroCliente = async (req, res) => {
  const corpoCliente = req.body;
  console.log(corpoCliente);
  try {
    const clienteCadastrado = await cadastrarCliente(corpoCliente);

    if (!clienteCadastrado) {
      return res
        .status(500)
        .json({ mensagem: 'Erro ao cadastrar, repita a operação' });
    }
    return res.json(clienteCadastrado[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const editarCliente = async (req, res) => {
  const corpoCliente = req.body;
  const id = req.params.id;
  try {
    const clienteSistema = await validarIdCliente(id);
    if (corpoCliente.email !== clienteSistema.email) {
      if (await validarEmailCliente(corpoCliente.email)) {
        return res
          .status(400)
          .json({ mensagem: 'O e-mail informado já está em uso' });
      }
    }
    if (corpoCliente.cpf !== clienteSistema.cpf) {
      if (await validarCpfCliente(corpoCliente.cpf)) {
        return res
          .status(400)
          .json({ mensagem: 'O CPF informado já está em uso' });
      }
    }

    const clienteAtualizado = await atualizarCliente(corpoCliente, id);
    return res.json(clienteAtualizado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarClientes = async (req, res) => {
  try {
    const listaDeClientes = await buscarClientes();
    return res.json(listaDeClientes);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const detalharCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const clienteDetalhado = await validarIdCliente(id);
    return res.json(clienteDetalhado);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastroCliente,
  editarCliente,
  listarClientes,
  detalharCliente,
};
