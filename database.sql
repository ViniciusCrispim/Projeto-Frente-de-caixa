CREATE DATABASE pdv;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE categorias (
	id SERIAL PRIMARY KEY,
  descricao TEXT UNIQUE NOT NULL
);

INSERT INTO categorias (descricao) VALUES
	('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games');


CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  quantidade_estoque INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  categoria_id INTEGER NOT NULL,
  produto_imagem TEXT
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  cpf CHAR(11) NOT NULL UNIQUE,
  cep CHAR(8),
  rua TEXT,
  numero INTEGER,
  bairro TEXT,
  cidade TEXT,
  estado CHAR(2)
);

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id),
  observacao TEXT,
  valor_total INTEGER NOT NULL);
 
CREATE TABLE pedido_produtos (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id),
  produto_id INTEGER NOT NULL REFERENCES produtos(id),
  quantidade_produto INTEGER NOT NULL,
  valor_produto INTEGER NOT NULL);
