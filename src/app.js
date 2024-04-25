const express = require('express');
const mysql = require('mysql2');
const config = require('../config');


const app = express();
const connection = mysql.createConnection(config);


app.get('/bicicletas', (req, res) => {
    connection.query('SELECT * FROM bicicletas', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar bicicletas');
        } else {
            res.status(200).json(results);
        }
    });
});


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
    const { marca, modelo, preco } = req.body;
    connection.query('INSERT INTO bicicletas (marca, modelo, preco) VALUES (?, ?, ?)', [marca, modelo, preco], (err, results) => {
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
    const { marca, modelo, preco } = req.body;

    connection.query('UPDATE bicicletas SET marca = ?, modelo = ?, preco = ? WHERE id = ?', [marca, modelo, preco, id], (err, results) => {
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

app.listen(3000, () => console.log('Servidor em execução na porta 3000'));



