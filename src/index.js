import app from '../app.js';

const PORT =  3006;

// Define a rota antes de iniciar o servidor
app.get('/', (req, res) => {
  res.send('Bem vindo a API de bicicleta MarketCycling!');
});

app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
