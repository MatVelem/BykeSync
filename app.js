// Importar os módulos necessários
const express = require('express');
const mysql = require('mysql2');
const config = require('./config.js');


const app = express();

const connection = mysql.createConnection(config);

app.get('/', (req, res) => {
    res.send('Página inicial');
  });


app.use(express.json());

app.get('/bicicletas', (req, res) => {
 
});

app.get('/bicicletas/:id', (req, res) => {
   
});

app.post('/bicicletas', (req, res) => {
 
});

app.put('/bicicletas/:id', (req, res) => {
   
});

app.delete('/bicicletas/:id', (req, res) => {
   
});


app.post('/usuarios', async (req, res) => {

});

app.get('/usuarios/:id', async (req, res) => {
  
});


const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Servidor em execução na porta ${PORT}`));
