import app from './app.js';
import cors from 'cors';
const PORT = 3001;

// Configuração do CORS (antes das rotas)
app.use(cors({
  origin: 'http://localhost:8081', // Substitua pela URL do seu frontend React Native
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));

// Suas rotas existentes
app.get('/', (req, res) => {
  res.send('Bem vindo a API de bicicleta MarketCycling!');
});

app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});