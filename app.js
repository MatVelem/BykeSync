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

// Rota para buscar bicicletas por termo de pesquisa
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

// Rota para adicionar uma nova bicicleta
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

// Rota para atualizar uma bicicleta existente
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

// Rota para excluir uma bicicleta
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

// Rota para buscar acessórios
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

// Rota para adicionar um novo acessório
app.post('/acessorios', (req, res) => {
  const { tipo, preco } = req.body;

  const sql = 'INSERT INTO acessorios (tipo, preco) VALUES (?, ?)';
  connection.query(sql, [tipo, preco], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar acessório.');
    }
    const newAcessorio = { id: result.insertId, tipo, preco };
    res.status(201).json(newAcessorio);
  });
});

// Rota para atualizar um acessório existente
app.put('/acessorios/:id', (req, res) => {
  const { id } = req.params;
  const { tipo, preco } = req.body;

  const sql = 'UPDATE acessorios SET tipo = ?, preco = ? WHERE id = ?';
  connection.query(sql, [tipo, preco, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar acessório.');
    }
    const updatedAcessorio = { id, tipo, preco };
    res.status(200).json(updatedAcessorio);
  });
});

// Rota para excluir um acessório
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

export default app;
