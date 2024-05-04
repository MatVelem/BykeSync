import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM bicicletas")
  return rows
}

export async function mostrarbicicleta(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM bicicletas
  WHERE id = ?
  `, [id])
  return rows[0]
}

export async function criarbicicleta(marca, modelo, cor, preco, estoque, foto, descricao) {
  const [result] = await pool.query(`
    INSERT INTO bicicletas (marca, modelo, cor, preco, estoque, foto, descricao)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [marca, modelo, cor, preco, estoque, foto, descricao]);
  const id = result.insertId;
  return id; 
}

  export async function criarusuario(nome, email, senha, endereco, telefone, tipo_usuario, foto) {
    const [result] = await pool.query(`
      INSERT INTO usuarios (nome, email, senha, endereco, telefone, tipo_usuario)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [nome, email, senha, endereco, telefone, tipo_usuario]);
    const id = result.insertId;
    return getUser(id);
  }
  
  export async function mostrarusuario(id) {
    const [rows] = await pool.query(`
      SELECT * 
      FROM usuarios
      WHERE id = ?
    `, [id]);
    return rows[0];
  }
  
  export async function criarusuario(id) {
    await pool.query(`
      DELETE FROM bicicletas WHERE id = ?
    `, [id]);
}
  
  
