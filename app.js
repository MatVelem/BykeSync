import express from 'express';
import mysql from 'mysql2';
import config from './config.js';

const app = express();

const connection = mysql.createConnection(config);

app.get('/', (req, res) => {
    res.send('Página inicial');
});

app.use(express.json());

app.get('/bicicletas', (req, res) => {
    // Lógica para lidar com a rota GET /bicicletas
});

app.get('/bicicletas/:id', (req, res) => {
    // Lógica para lidar com a rota GET /bicicletas/:id
});

app.post('/bicicletas', (req, res) => {
    // Lógica para lidar com a rota POST /bicicletas
});

app.put('/bicicletas/:id', (req, res) => {
    // Lógica para lidar com a rota PUT /bicicletas/:id
});

app.delete('/bicicletas/:id', (req, res) => {
    // Lógica para lidar com a rota DELETE /bicicletas/:id
});

app.post('/usuarios', async (req, res) => {
    // Lógica para lidar com a rota POST /usuarios
});

app.get('/usuarios/:id', async (req, res) => {
    // Lógica para lidar com a rota GET /usuarios/:id
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Servidor em execução na porta ${PORT}`));
