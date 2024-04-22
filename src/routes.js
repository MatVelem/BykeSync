const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Envie uma resposta simples para o caminho raiz
    res.send('Olá do seu servidor Node.js!');
  });

module.exports = router