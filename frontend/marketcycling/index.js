// backend/src/index.js
import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import config from './config.js';

const app = express();

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    throw new Error('Database connection failed');
  }
  console.log('Connected to the database successfully');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/bicicletas', (req, res) => {
  // Implementação da rota GET para buscar bicicletas
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).send('Por favor, forneça um termo de pesquisa.');
  }

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

// Outras rotas podem ser definidas aqui conforme necessário

const PORT = process.env.PORT || 3007; // Ajuste a porta conforme necessário

app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});