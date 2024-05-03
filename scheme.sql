--código do banco de dados 

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS compra_bicicletas;

-- Usar banco de dados
USE compra_bicicletas;

-- Criar tabela de bicicletas
CREATE TABLE bicicletas (
  id INT NOT NULL AUTO_INCREMENT,
  marca VARCHAR(255) NOT NULL,
  modelo VARCHAR(255) NOT NULL,
  cor VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  estoque INT NOT NULL,
  foto LONGBLOB,
  descricao TEXT,
  PRIMARY KEY (id)
);

-- Criar tabela de acessórios
CREATE TABLE acessorios (
  id INT NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(255) NOT NULL,
  marca VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  estoque INT NOT NULL,
  foto LONGBLOB,
  descricao TEXT,
  PRIMARY KEY (id)
);

-- Criar tabela de usuários
CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  telefone VARCHAR(255) NOT NULL,
  tipo_usuario ENUM('administrador', 'cliente') NOT NULL DEFAULT 'cliente',
  foto LONGBLOB,
  PRIMARY KEY (id)
);

-- Criar tabela de compras
CREATE TABLE compras (
  id INT NOT NULL AUTO_INCREMENT,
  data DATETIME NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  bicicleta_id INT NOT NULL,
  acessorio_id INT,
  usuario_id INT NOT NULL,
  status ENUM('pendente', 'pago', 'entregue') NOT NULL DEFAULT 'pendente',
  PRIMARY KEY (id),
  FOREIGN KEY (bicicleta_id) REFERENCES bicicletas (id),
  FOREIGN KEY (acessorio_id) REFERENCES acessorios (id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);

-- Criar tabela de serviços de manutenção
CREATE TABLE servicos_manutencao (
  id INT NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  descricao TEXT,
  tempo_execucao INT NOT NULL,
  PRIMARY KEY (id)
);

-- Criar tabela de agendamentos
CREATE TABLE mecanicos (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(255) NOT NULL,
    especialidades VARCHAR(255) NOT NULL,
    foto LONGBLOB,
    PRIMARY KEY (id)
);

CREATE TABLE agendamentos (
    id INT NOT NULL AUTO_INCREMENT,
    data DATETIME NOT NULL,
    hora TIME NOT NULL,
    servico_manutencao_id INT NOT NULL,
    usuario_id INT NOT NULL,
    mecanico_id INT NOT NULL,
    status ENUM('pendente', 'confirmado', 'realizado') NOT NULL DEFAULT 'pendente',
    PRIMARY KEY (id),
    FOREIGN KEY (servico_manutencao_id) REFERENCES servicos_manutencao (id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
    FOREIGN KEY (mecanico_id) REFERENCES mecanicos (id)
);


CREATE TABLE aluguels (
  id INT NOT NULL AUTO_INCREMENT,
  bicicleta_id INT NOT NULL,
  usuario_id INT NOT NULL,
  data_inicio DATETIME NOT NULL,
  data_fim DATETIME NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  status ENUM('pendente', 'confirmado', 'finalizado') NOT NULL DEFAULT 'pendente',
  observacao TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (bicicleta_id) REFERENCES bicicletas (id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);

CREATE TABLE tipos_servico (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  tempo_estimado INT NOT NULL,
  garantia INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE mecanicos_servicos (
  mecanico_id INT NOT NULL,
  tipo_servico_id INT NOT NULL,
  PRIMARY KEY (mecanico_id, tipo_servico_id),
  FOREIGN KEY (mecanico_id) REFERENCES mecanicos (id),
  FOREIGN KEY (tipo_servico_id) REFERENCES tipos_servico (id)
);

INSERT INTO bicicletas (id, marca, modelo, cor, preco, estoque, foto, descricao) VALUES (0,"caloi","rx580","mateus",920.4,5,null,"essa aqui é a bike do momento")
INSERT INTO bicicletas (id, marca, modelo, cor, preco, estoque, foto, descricao) VALUES (2,"macha","titanium","rocket",3250.4,6,null,"bike mais top")
DELETE FROM bicicletas WHERE id = 
