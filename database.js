import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
host: process.env.MYSQL_HOST,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASSWORD,
database: process.env.MYSQL_DATABASE
}).promise()

async function mostrarbicicleta(callback) {

const [rows] = await pool.query('Select * FROM bicicletas')
return [rows]
}

async function pegarbicicleta(id) { 
    const [rows] = await pool.query(' SELECT * FROM bicicletas WHERE id = ? ', [id] )
    return rows[0]
}


async function criarbicicleta(id, marca, modelo, cor, preco, estoque, foto, descricao) {
  const result =  await pool.query('INSERT INTO bicicletas (marca, modelo, cor, preco, estoque, foto, descricao) VALUES (?, ?, ?, ?, ?, ?, ?) ', [marca, modelo, cor, preco, estoque, foto, descricao])
    return result.insertId

}
const mostrar = await mostrarbicicleta();

//const criar =  await criarbicicleta("4m","caloi","vermelho",4500.45,4,null,"melhor bike do mercado");
//const pegar = await pegarbicicleta(3);
console.log(mostrar)
export { mostrarbicicleta }