import React, { useEffect, useState, useCallback } from 'react';

function App() {
  const [bicicletas, setBicicletas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBicicletas = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3006/bicicletas?q=${searchTerm}`);
      const data = await response.json();
      setBicicletas(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBicicletas();
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchBicicletas]);

  const handleSearch = async () => {
    await fetchBicicletas();
  };

  const handleFileUpload = async (id, event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('bicicletaImage', file);

    try {
      const response = await fetch(`http://localhost:3006/bicicletas/upload/${id}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.text();
      console.log(data); // Confirmação do upload no console
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">MarketCycling</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/bicicletas">Bicicletas</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/acessorios">Acessórios</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contato">Contato</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="container mt-4">
          <h2>Nossas Bicicletas</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar bicicletas"
          />
          <button className="btn btn-primary ms-2" onClick={handleSearch}>Buscar</button>
          <div className="row mt-4">
            {bicicletas.map((bicicleta) => (
              <div key={bicicleta.id} className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{bicicleta.marca}</h5>
                    <p className="card-text">Modelo: {bicicleta.modelo}</p>
                    <p className="card-text">Cor: {bicicleta.cor}</p>
                    <p className="card-text">Preço: {bicicleta.preco}</p>
                    <div>
                      {/* Adicionando botão de upload de foto apenas quando estiver criando uma nova bicicleta */}
                      {window.location.pathname === '/bicicletas' && (
                        <input type="file" onChange={(e) => handleFileUpload(bicicleta.id, e)} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-dark text-light text-center py-3">
        <p>&copy; 2023 MarketCycling</p>
      </footer>
    </div>
  );
}

export default App;
