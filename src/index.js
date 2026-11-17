require('dotenv').config();
require('express-async-errors');

const cors = require('cors');
const express = require('express');
const rotas = require('./routes/rotas');

const app = express();

app.use(cors());
app.use(express.json());
app.use(rotas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
