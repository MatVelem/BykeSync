import express from 'express'; // Importe o express

import mysql from 'mysql2';
import config from '../config.js';
import routes from './routes.js';

const databaseHost = config.host;
const databaseUser = config.user;
const databasePassword = config.password;
const databaseName = config.database;

function database(config) {
  const connection = mysql.createConnection(config);
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      throw new Error('Database connection failed');
    }
    console.log('Connected to the database successfully');
  });
  return connection;
}

const app = express();
const connection = database(config);

app.use(express.json());

// Use as rotas definidas no arquivo routes.js
app.use('/', routes);

export default app; // Exporte o app como padrão

