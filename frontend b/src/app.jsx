import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Acessorios from './Acessorios';

const App = () => {
  const [bicicletas, setBicicletas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBicicleta, setNewBicicleta] = useState({ marca: '', modelo: '', cor: '', preco: '' });
  const [editingBicicleta, setEditingBicicleta] = useState(null);

  // Função para buscar bicicletas com base no termo de pesquisa
  const fetchBicicletas = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3006/bicicletas?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar bicicletas');
      }
      const data = await response.json();
      setBicicletas(data);
    } catch (error) {
      console.error('Erro ao buscar bicicletas:', error);
    }
  }, [searchTerm]);

  // Efeito para buscar bicicletas ao montar o componente
  useEffect(() => {
    fetchBicicletas();
  }, [fetchBicicletas]);

  // Função para lidar com a pesquisa de bicicletas
  const handleSearch = async () => {
    await fetchBicicletas();
  };

  // Função para adicionar uma nova bicicleta
  const handleAddBicicleta = async () => {
    try {
      const novaBicicleta = {
        marca: newBicicleta.marca,
        modelo: newBicicleta.modelo,
        cor: newBicicleta.cor,
        preco: newBicicleta.preco,
        estoque: 0,
      };

      const response = await fetch('http://localhost:3006/bicicletas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaBicicleta),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar bicicleta');
      }

      const data = await response.json();
      setBicicletas([...bicicletas, data]);
      setNewBicicleta({ marca: '', modelo: '', cor: '', preco: '' });
    } catch (error) {
      console.error('Erro ao adicionar bicicleta:', error);
    }
  };

  // Função para atualizar uma bicicleta existente
  const handleEditBicicleta = async (id) => {
    try {
      const response = await fetch(`http://localhost:3006/bicicletas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingBicicleta),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar bicicleta');
      }

      const data = await response.json();
      setBicicletas(bicicletas.map((bicicleta) => (bicicleta.id === id ? data : bicicleta)));
      setEditingBicicleta(null);
    } catch (error) {
      console.error('Erro ao atualizar bicicleta:', error);
    }
  };

  // Função para excluir uma bicicleta
  const handleDeleteBicicleta = async (id) => {
    try {
      const response = await fetch(`http://localhost:3006/bicicletas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir bicicleta');
      }

      setBicicletas(bicicletas.filter((bicicleta) => bicicleta.id !== id));
    } catch (error) {
      console.error('Erro ao excluir bicicleta:', error);
    }
  };

  return (
    <Router>
      <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link className="navbar-brand" to="/">MarketCycling</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/bicicletas">Bicicletas</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/acessorios">Acessórios</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contato">Contato</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bicicletas" element={<BicicletasPage />} />
            <Route path="/acessorios" element={<Acessorios />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Home = () => (
  <div className="container mt-4">
    <h2>Bem-vindo à MarketCycling!</h2>
    {/* Conteúdo do componente */}
  </div>
);

const Contato = () => (
  <div className="container mt-4">
    <h2>Contato</h2>
    <p>Entre em contato conosco através do email: contato@marketcycling.com</p>
    {/* Conteúdo do componente */}
  </div>
);

const BicicletasPage = () => {
  const [bicicletas, setBicicletas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBicicleta, setNewBicicleta] = useState({ marca: '', modelo: '', cor: '', preco: '' });
  const [editingBicicleta, setEditingBicicleta] = useState(null);

  // Função para buscar bicicletas com base no termo de pesquisa
  const fetchBicicletas = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3006/bicicletas?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar bicicletas');
      }
      const data = await response.json();
      setBicicletas(data);
    } catch (error) {
      console.error('Erro ao buscar bicicletas:', error);
    }
  }, [searchTerm]);

  // Efeito para buscar bicicletas ao montar o componente
  useEffect(() => {
    fetchBicicletas();
  }, [fetchBicicletas]);

  // Função para lidar com a pesquisa de bicicletas
  const handleSearch = async () => {
    await fetchBicicletas();
  };

  // Função para adicionar uma nova bicicleta
  const handleAddBicicleta = async () => {
    try {
      const novaBicicleta = {
        marca: newBicicleta.marca,
        modelo: newBicicleta.modelo,
        cor: newBicicleta.cor,
        preco: newBicicleta.preco,
        estoque: 0,
      };

      const response = await fetch('http://localhost:3006/bicicletas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaBicicleta),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar bicicleta');
      }

      const data = await response.json();
      setBicicletas([...bicicletas, data]);
      setNewBicicleta({ marca: '', modelo: '', cor: '', preco: '' });
    } catch (error) {
      console.error('Erro ao adicionar bicicleta:', error);
    }
  };

  // Função para atualizar uma bicicleta existente
  const handleEditBicicleta = async (id) => {
    try {
      const response = await fetch(`http://localhost:3006/bicicletas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingBicicleta),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar bicicleta');
      }

      const data = await response.json();
      setBicicletas(bicicletas.map((bicicleta) => (bicicleta.id === id ? data : bicicleta)));
      setEditingBicicleta(null);
    } catch (error) {
      console.error('Erro ao atualizar bicicleta:', error);
    }
  };

  // Função para excluir uma bicicleta
  const handleDeleteBicicleta = async (id) => {
    try {
      const response = await fetch(`http://localhost:3006/bicicletas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir bicicleta');
      }

      setBicicletas(bicicletas.filter((bicicleta) => bicicleta.id !== id));
    } catch (error) {
      console.error('Erro ao excluir bicicleta:', error);
    }
  };

  return (
    <section className="container mt-4">
      <h2>Nossas Bicicletas</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar bicicletas"
      />
      <button className="btn btn-primary ms-2" onClick={handleSearch}>Buscar</button>

      {/* Formulário para adicionar nova bicicleta */}
      <div className="mt-4">
        <h4>Adicionar Nova Bicicleta</h4>
        <input
          type="text"
          value={newBicicleta.marca}
          onChange={(e) => setNewBicicleta({ ...newBicicleta, marca: e.target.value })}
          placeholder="Marca"
        />
        <input
          type="text"
          value={newBicicleta.modelo}
          onChange={(e) => setNewBicicleta({ ...newBicicleta, modelo: e.target.value })}
          placeholder="Modelo"
        />
        <input
          type="text"
          value={newBicicleta.cor}
          onChange={(e) => setNewBicicleta({ ...newBicicleta, cor: e.target.value })}
          placeholder="Cor"
        />
        <input
          type="text"
          value={newBicicleta.preco}
          onChange={(e) => setNewBicicleta({ ...newBicicleta, preco: e.target.value })}
          placeholder="Preço"
        />
        <button className="btn btn-success ms-2" onClick={handleAddBicicleta}>Adicionar</button>
      </div>

      <div className="row mt-4">
        {bicicletas.map((bicicleta) => (
          <div key={bicicleta.id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                {editingBicicleta && editingBicicleta.id === bicicleta.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingBicicleta.marca}
                      onChange={(e) => setEditingBicicleta({ ...editingBicicleta, marca: e.target.value })}
                      placeholder="Marca"
                    />
                    <input
                      type="text"
                      value={editingBicicleta.modelo}
                      onChange={(e) => setEditingBicicleta({ ...editingBicicleta, modelo: e.target.value })}
                      placeholder="Modelo"
                    />
                    <input
                      type="text"
                      value={editingBicicleta.cor}
                      onChange={(e) => setEditingBicicleta({ ...editingBicicleta, cor: e.target.value })}
                      placeholder="Cor"
                    />
                    <input
                      type="text"
                      value={editingBicicleta.preco}
                      onChange={(e) => setEditingBicicleta({ ...editingBicicleta, preco: e.target.value })}
                      placeholder="Preço"
                    />
                    <button className="btn btn-success ms-2" onClick={() => handleEditBicicleta(bicicleta.id)}>Salvar</button>
                    <button className="btn btn-secondary ms-2" onClick={() => setEditingBicicleta(null)}>Cancelar</button>
                  </div>
                ) : (
                  <div>
                    <h5 className="card-title">{bicicleta.marca}</h5>
                    <p className="card-text">Modelo: {bicicleta.modelo}</p>
                    <p className="card-text">Cor: {bicicleta.cor}</p>
                    <p className="card-text">Preço: {bicicleta.preco}</p>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => setEditingBicicleta(bicicleta)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleDeleteBicicleta(bicicleta.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default App;
