import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3007/bicicletas') // Ajuste a porta conforme necessário
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Bem vindo ao MarketCycling!</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;