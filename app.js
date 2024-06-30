import express from 'express';
import mysql from 'mysql2';
import config from './config.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw new Error('Falha na conexão com o banco de dados');
  }
  console.log('Conectado ao banco de dados com sucesso');
});

// Rotas de bicicletas
app.get('/bicicletas', (req, res) => {
  const searchTerm = req.query.q || '';
  const sql = `
    SELECT * FROM bicicletas
    WHERE marca LIKE ? OR modelo LIKE ? OR cor LIKE ? OR preco LIKE ?
  `;
  const query = `%${searchTerm}%`;
  connection.query(sql, [query, query, query, query], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar bicicletas.');
    }
    res.status(200).json(results);
  });
});

app.post('/bicicletas', (req, res) => {
  const { marca, modelo, cor, preco } = req.body;
  const sql = 'INSERT INTO bicicletas (marca, modelo, cor, preco) VALUES (?, ?, ?, ?)';
  connection.query(sql, [marca, modelo, cor, preco], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar bicicleta.');
    }
    const newBicicleta = { id: result.insertId, marca, modelo, cor, preco };
    res.status(201).json(newBicicleta);
  });
});

app.put('/bicicletas/:id', (req, res) => {
  const { id } = req.params;
  const { marca, modelo, cor, preco } = req.body;
  const sql = 'UPDATE bicicletas SET marca = ?, modelo = ?, cor = ?, preco = ? WHERE id = ?';
  connection.query(sql, [marca, modelo, cor, preco, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar bicicleta.');
    }
    const updatedBicicleta = { id, marca, modelo, cor, preco };
    res.status(200).json(updatedBicicleta);
  });
});

app.delete('/bicicletas/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM bicicletas WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao excluir bicicleta.');
    }
    res.status(200).send('Bicicleta excluída com sucesso');
  });
});

// Rotas de acessórios
app.get('/acessorios', (req, res) => {
  const sql = 'SELECT * FROM acessorios';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar acessórios.');
    }
    res.status(200).json(results);
  });
});

app.post('/acessorios', (req, res) => {
  const { tipo, preco, marca, imagem } = req.body;
  const sql = 'INSERT INTO acessorios (tipo, preco, marca, imagem) VALUES (?, ?, ?, ?)';
  connection.query(sql, [tipo, preco, marca, imagem], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar acessório.');
    }
    const newAcessorio = { id: result.insertId, tipo, preco, marca, imagem };
    res.status(201).json(newAcessorio);
  });
});

app.put('/acessorios/:id', (req, res) => {
  const { id } = req.params;
  const { tipo, preco, marca, imagem } = req.body;
  const sql = 'UPDATE acessorios SET tipo = ?, preco = ?, marca = ?, imagem = ? WHERE id = ?';
  connection.query(sql, [tipo, preco, marca, imagem, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar acessório.');
    }
    const updatedAcessorio = { id, tipo, preco, marca, imagem };
    res.status(200).json(updatedAcessorio);
  });
});

app.delete('/acessorios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM acessorios WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao excluir acessório.');
    }
    res.status(200).send('Acessório excluído com sucesso');
  });
});

// Rotas de usuários
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar usuários.');
    }
    res.status(200).json(results);
  });
});

app.post('/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  connection.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar usuário.');
    }
    const newUsuario = { id: result.insertId, nome, email, senha };
    res.status(201).json(newUsuario);
  });
});

app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
  connection.query(sql, [nome, email, senha, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar usuário.');
    }
    const updatedUsuario = { id, nome, email, senha };
    res.status(200).json(updatedUsuario);
  });
});

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM usuarios WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao excluir usuário.');
    }
    res.status(200).send('Usuário excluído com sucesso');
  });
});

// Rotas de compras
app.get('/compras', (req, res) => {
  const sql = 'SELECT * FROM compras';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar compras.');
    }
    res.status(200).json(results);
  });
});

app.post('/compras', (req, res) => {
  const { usuarioId, bicicletaId, dataCompra, valorTotal } = req.body;
  const sql = 'INSERT INTO compras (usuarioId, bicicletaId, dataCompra, valorTotal) VALUES (?, ?, ?, ?)';
  connection.query(sql, [usuarioId, bicicletaId, dataCompra, valorTotal], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar compra.');
    }
    const newCompra = { id: result.insertId, usuarioId, bicicletaId, dataCompra, valorTotal };
    res.status(201).json(newCompra);
  });
});

app.put('/compras/:id', (req, res) => {
  const { id } = req.params;
  const { usuarioId, bicicletaId, dataCompra, valorTotal } = req.body;
  const sql = 'UPDATE compras SET usuarioId = ?, bicicletaId = ?, dataCompra = ?, valorTotal = ? WHERE id = ?';
  connection.query(sql, [usuarioId, bicicletaId, dataCompra, valorTotal, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar compra.');
    }
    const updatedCompra = { id, usuarioId, bicicletaId, dataCompra, valorTotal };
    res.status(200).json(updatedCompra);
  });
});

app.delete('/compras/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM compras WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao excluir compra.');
    }
    res.status(200).send('Compra excluída com sucesso');
  });
});

// Rotas de manutenção
app.get('/manutencoes', (req, res) => {
  const sql = 'SELECT * FROM manutencoes';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar manutenções.');
    }
    res.status(200).json(results);
  });
});

app.post('/manutencoes', (req, res) => {
  const { bicicletaId, mecanicoId, dataManutencao, descricao, valor } = req.body;
  const sql = 'INSERT INTO manutencoes (bicicletaId, mecanicoId, dataManutencao, descricao, valor) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [bicicletaId, mecanicoId, dataManutencao, descricao, valor], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar manutenção.');
    }
    const newManutencao = { id: result.insertId, bicicletaId, mecanicoId, dataManutencao, descricao, valor };
    res.status(201).json(newManutencao);
  });
});

app.put('/manutencoes/:id', (req, res) => {
  const { id } = req.params;
  const { bicicletaId, mecanicoId, dataManutencao, descricao, valor } = req.body;
  const sql = 'UPDATE manutencoes SET bicicletaId = ?, mecanicoId = ?, dataManutencao = ?, descricao = ?, valor = ? WHERE id = ?';
  connection.query(sql, [bicicletaId, mecanicoId, dataManutencao, descricao, valor, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar manutenção.');
    }
    const updatedManutencao = { id, bicicletaId, mecanicoId, dataManutencao, descricao, valor };
    res.status(200).json(updatedManutencao);
  });
});

app.delete('/manutencoes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM manutencoes WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao excluir manutenção.');
    }
    res.status(200).send('Manutenção excluída com sucesso');
  });
});

// Rotas de mecânicos
app.get('/mecanicos', (req, res) => {
  const sql = 'SELECT * FROM mecanicos';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar mecânicos.');
    }
    res.status(200).json(results);
  });
});

app.post('/mecanicos', (req, res) => {
  const { nome, experiencia, especialidade } = req.body;
  const sql = 'INSERT INTO mecanicos (nome, experiencia, especialidade) VALUES (?, ?, ?)';
  connection.query(sql, [nome, experiencia, especialidade], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar mecânico.');
    }
    const newMecanico = { id: result.insertId, nome, experiencia, especialidade };
    res.status(201).json(newMecanico);
  });
});

app.put('/mecanicos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, experiencia, especialidade } = req.body;
  const sql = 'UPDATE mecanicos SET nome = ?, experiencia = ?, especialidade = ? WHERE id = ?';
  connection.query(sql, [nome, experiencia, especialidade, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar mecânico.');
    }
    const updatedMecanico = { id, nome, experiencia, especialidade };
    res.status(200).json(updatedMecanico);
  });
});

app.delete('/mecanicos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM mecanicos WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao excluir mecânico.');
    }
    res.status(200).send('Mecânico excluído com sucesso');
  });
});

// Rotas de agendamentos
app.get('/agendamentos', (req, res) => {
  const sql = 'SELECT * FROM agendamentos';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar agendamentos.');
    }
    res.status(200).json(results);
  });
});

app.post('/agendamentos', (req, res) => {
  const { usuarioId, bicicletaId, mecanicoId, dataAgendamento, descricao } = req.body;
  const sql = 'INSERT INTO agendamentos (usuarioId, bicicletaId, mecanicoId, dataAgendamento, descricao) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [usuarioId, bicicletaId, mecanicoId, dataAgendamento, descricao], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar agendamento.');
    }
    const newAgendamento = { id: result.insertId, usuarioId, bicicletaId, mecanicoId, dataAgendamento, descricao };
    res.status(201).json(newAgendamento);
  });
});

app.put('/agendamentos/:id', (req, res) => {
  const { id } = req.params;
  const { usuarioId, bicicletaId, mecanicoId, dataAgendamento, descricao } = req.body;
  const sql = 'UPDATE agendamentos SET usuarioId = ?, bicicletaId = ?, mecanicoId = ?, dataAgendamento = ?, descricao = ? WHERE id = ?';
  connection.query(sql, [usuarioId, bicicletaId, mecanicoId, dataAgendamento, descricao, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar agendamento.');
    }
    const updatedAgendamento = { id, usuarioId, bicicletaId, mecanicoId, dataAgendamento, descricao };
    res.status(200).json(updatedAgendamento);
  });
});

app.delete('/agendamentos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM agendamentos WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao excluir agendamento.');
    }
    res.status(200).send('Agendamento excluído com sucesso');
  });
});

// Rotas de alugueis
app.get('/alugueis', (req, res) => {
  const sql = 'SELECT * FROM alugueis';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar alugueis.');
    }
    res.status(200).json(results);
  });
});

app.post('/alugueis', (req, res) => {
  const { usuarioId, bicicletaId, dataInicio, dataFim, valorTotal } = req.body;
  const sql = 'INSERT INTO alugueis (usuarioId, bicicletaId, dataInicio, dataFim, valorTotal) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [usuarioId, bicicletaId, dataInicio, dataFim, valorTotal], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar aluguel.');
    }
    const newAluguel = { id: result.insertId, usuarioId, bicicletaId, dataInicio, dataFim, valorTotal };
    res.status(201).json(newAluguel);
  });
});

app.put('/alugueis/:id', (req, res) => {
  const { id } = req.params;
  const { usuarioId, bicicletaId, dataInicio, dataFim, valorTotal } = req.body;
  const sql = 'UPDATE alugueis SET usuarioId = ?, bicicletaId = ?, dataInicio = ?, dataFim = ?, valorTotal = ? WHERE id = ?';
  connection.query(sql, [usuarioId, bicicletaId, dataInicio, dataFim, valorTotal, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar aluguel.');
    }
    const updatedAluguel = { id, usuarioId, bicicletaId, dataInicio, dataFim, valorTotal };
    res.status(200).json(updatedAluguel);
  });
});

app.delete('/alugueis/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM alugueis WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao excluir aluguel.');
    }
    res.status(200).send('Aluguel excluído com sucesso');
  });
});

// Rotas de tipos de serviços
app.get('/tiposServicos', (req, res) => {
  const sql = 'SELECT * FROM tiposServicos';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar tipos de serviços.');
    }
    res.status(200).json(results);
  });
});

app.post('/tiposServicos', (req, res) => {
  const { nome, descricao, preco } = req.body;
  const sql = 'INSERT INTO tiposServicos (nome, descricao, preco) VALUES (?, ?, ?)';
  connection.query(sql, [nome, descricao, preco], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar tipo de serviço.');
    }
    const newTipoServico = { id: result.insertId, nome, descricao, preco };
    res.status(201).json(newTipoServico);
  });
});

app.put('/tiposServicos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;
  const sql = 'UPDATE tiposServicos SET nome = ?, descricao = ?, preco = ? WHERE id = ?';
  connection.query(sql, [nome, descricao, preco, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar tipo de serviço.');
    }
    const updatedTipoServico = { id, nome, descricao, preco };
    res.status(200).json(updatedTipoServico);
  });
});

app.delete('/tiposServicos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tiposServicos WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao excluir tipo de serviço.');
    }
    res.status(200).send('Tipo de serviço excluído com sucesso');
  });
});

export default app;