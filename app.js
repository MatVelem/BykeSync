import express from 'express';
import mysql from 'mysql2';
import config from './config.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection setup
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

// Routes

// GET bikes by search term
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

// POST form data processing
app.post('/form', (req, res) => {
  const { obrigatorio, email } = req.body;

  if (!obrigatorio) {
    return res.status(400).json({ error: 'Campo obrigatório não fornecido' });
  }

  if (email && !isValidEmail(email)) {
    return res.status(400).json({ error: 'Endereço de e-mail inválido' });
  }

  res.status(200).send('Form data processed successfully');
});

// DELETE registro
app.delete('/registros/:id', (req, res) => {
  const { id } = req.params;
  const confirmacao = req.query.confirmacao;

  if (confirmacao === 'true') {
    // Handle deletion from the database
    res.status(200).send('Registro excluído com sucesso');
  } else {
    res.status(400).send('Exclusão cancelada pelo usuário');
  }
});

// Additional routes (accessories, users, purchases, services, mechanics, appointments, rentals, service types) can be similarly defined

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



export default app;
