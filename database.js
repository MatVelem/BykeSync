import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

async function mostrarbicicleta(callback) {
  const [rows] = await pool.query('SELECT * FROM bicicletas');
  return rows;
}

async function pegarbicicleta(id) { 
  const [rows] = await pool.query('SELECT * FROM bicicletas WHERE id = ?', [id]);
  return rows[0];
}

async function criarbicicleta(marca, modelo, cor, preco, estoque, foto, descricao) {
  const result = await pool.query('INSERT INTO bicicletas (marca, modelo, cor, preco, estoque, foto, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)', [marca, modelo, cor, preco, estoque, foto, descricao]);
  return result.insertId;
}

// Envolve o código que usa o await em uma função assíncrona
async function iniciar() {
  const mostrar = await mostrarbicicleta();
  console.log(mostrar);
}

// Chama a função assíncrona para iniciar o processo
iniciar();

export { mostrarbicicleta, pegarbicicleta, criarbicicleta };