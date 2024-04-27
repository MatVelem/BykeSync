import express from 'express';
import mysql from 'mysql2';
import config from '../config.js';
import { mostrarbicicleta } from '../database.js';


const databaseHost = config.host;
const databaseUser = config.user;
const databasePassword = config.password;
const databaseName = config.database;


// Function to establish database connection using mysql2
function database(config) {
  const connection = mysql.createConnection(config);
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      throw new Error('Database connection failed');
    }
    console.log('Connected to the database successfully');
    return connection;
  });
}


// Create Express app and connect to the database
const app = express();
const connection = database(config);

app.use(express.json());

// Welcome message at the root endpoint
app.get('/', (req, res) => {
  res.send('Bem vindo a API de bicicleta MarketCycling!');
});

//
app.get('/bicicletas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  connection.query('SELECT * FROM bicicletas WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar bicicleta');
    } else if (results.length === 0) {
      res.status(404).send('Bicicleta não encontrada');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

app.post('/bicicletas', (req, res) => {
  const { marca, modelo, cor, preco, estoque, foto, descricao } = req.body;
  connection.query('INSERT INTO bicicletas (marca, modelo, cor, preco, estoque, foto, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)', [marca, modelo, cor, preco, estoque, foto, descricao], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao adicionar bicicleta');
    } else {
      res.status(201).send('Bicicleta adicionada com sucesso');
    }
  });
});

app.put('/bicicletas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { marca, modelo, cor, preco, estoque, foto, descricao } = req.body;
  connection.query('UPDATE bicicletas SET marca = ?, modelo = ?, cor = ?, preco = ?, estoque = ?, foto = ?, descricao = ? WHERE id = ?', [marca, modelo, cor, preco, estoque, foto, descricao, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar bicicleta');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Bicicleta não encontrada');
    } else {
      res.status(200).send('Bicicleta atualizada com sucesso');
    }
  });
});

app.delete('/bicicletas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  connection.query('DELETE FROM bicicletas WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao remover bicicleta');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Bicicleta não encontrada');
    } else {
      res.status(200).send('Bicicleta removida com sucesso');
    }
  });
});

// API endpoint para buscar bicicletas
app.get('/bicicletas', async (req, res) => {
    try {
      const bicicletas = await mostrarbicicleta(); // Aguarde a execução da função mostrarbicicleta
      res.status(200).json(bicicletas);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar bicicletas');
    }
  });

 
  

// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Servidor em execução na porta ${PORT}`));



