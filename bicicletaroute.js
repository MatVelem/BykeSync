import express from 'express';
import { mostrarbicicleta, criarbicicleta, apagarBicicleta } from './database';

const router = express.Router();

// Rota para criar uma nova bicicleta
router.post('/bicicletas', async (req, res) => {
  const { marca, modelo, cor, preco, estoque, descricao } = req.body;
  const foto = req.file; // Se estiver usando multer para lidar com upload de arquivos

  try {
    const bicicletaId = await criarbicicleta(marca, modelo, cor, preco, estoque, foto, descricao);
    res.status(201).json({ id: bicicletaId, message: 'Bicicleta criada com sucesso.' });
  } catch (error) {
    console.error('Erro ao criar bicicleta:', error);
    res.status(500).json({ error: 'Erro ao criar bicicleta.' });
  }
});

// Rota para buscar uma bicicleta por ID
router.get('/bicicletas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const bicicleta = await mostrarbicicleta(id);
    if (bicicleta) {
      res.status(200).json(bicicleta);
    } else {
      res.status(404).json({ error: 'Bicicleta não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao buscar bicicleta:', error);
    res.status(500).json({ error: 'Erro ao buscar bicicleta.' });
  }
});

// Rota para apagar uma bicicleta por ID
router.delete('/bicicletas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await apagarBicicleta(id);
    res.status(200).json({ message: 'Bicicleta apagada com sucesso.' });
  } catch (error) {
    console.error('Erro ao apagar bicicleta:', error);
    res.status(500).json({ error: 'Erro ao apagar bicicleta.' });
  }
});

export default router;