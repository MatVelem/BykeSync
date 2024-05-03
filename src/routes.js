import express from 'express';
import { mostrarbicicleta } from '../database.js';

const router = express.Router();

// Rota para buscar todas as bicicletas
router.get('/bicicletas', async (req, res) => {
    try {
        const bicicletas = await mostrarbicicleta();
        res.status(200).json(bicicletas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar bicicletas');
    }
});

// Rota para buscar uma bicicleta por ID
router.get('/bicicletas/:id', (req, res) => {
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

// Rota para adicionar uma bicicleta
router.post('/bicicletas', (req, res) => {
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

// Rota para atualizar uma bicicleta por ID
router.put('/bicicletas/:id', (req, res) => {
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

// Rota para remover uma bicicleta por ID
router.delete('/bicicletas/:id', (req, res) => {
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

export default router;