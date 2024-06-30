import React, { useState, useEffect } from 'react';

const Acessorios = () => {
  const [acessorios, setAcessorios] = useState([]);
  const [newAcessorio, setNewAcessorio] = useState({ tipo: '', preco: '' });
  const [editingAcessorio, setEditingAcessorio] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Função para buscar acessórios
  const fetchAcessorios = async () => {
    try {
      const response = await fetch('http://localhost:3006/acessorios');
      if (!response.ok) {
        throw new Error('Erro ao buscar acessórios');
      }
      const data = await response.json();
      setAcessorios(data);
    } catch (error) {
      console.error('Erro ao buscar acessórios:', error);
    }
  };

  useEffect(() => {
    fetchAcessorios();
  }, []);

  // Função para adicionar um novo acessório
  const handleAddAcessorio = async () => {
    try {
      const novoAcessorio = {
        tipo: newAcessorio.tipo,
        preco: newAcessorio.preco,
      };

      const response = await fetch('http://localhost:3006/acessorios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoAcessorio),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao adicionar acessório: ${errorMessage}`);
      }

      const data = await response.json();
      setAcessorios([...acessorios, data]);
      setNewAcessorio({ tipo: '', preco: '' });
    } catch (error) {
      console.error('Erro ao adicionar acessório:', error);
    }
  };

  // Função para atualizar um acessório existente
  const handleEditAcessorio = async (id) => {
    try {
      const response = await fetch(`http://localhost:3006/acessorios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingAcessorio),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar acessório');
      }

      const data = await response.json();
      setAcessorios(acessorios.map((acessorio) => (acessorio.id === id ? data : acessorio)));
      setEditingAcessorio(null);
    } catch (error) {
      console.error('Erro ao atualizar acessório:', error);
    }
  };

  // Função para excluir um acessório
  const handleDeleteAcessorio = async (id) => {
    try {
      const response = await fetch(`http://localhost:3006/acessorios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir acessório');
      }

      setAcessorios(acessorios.filter((acessorio) => acessorio.id !== id));
    } catch (error) {
      console.error('Erro ao excluir acessório:', error);
    }
  };

  // Função para filtrar acessórios pelo termo de busca
  const filteredAcessorios = acessorios.filter((acessorio) =>
    acessorio.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container mt-4">
      <h2>Nossos Acessórios</h2>

      {/* Formulário para adicionar novo acessório */}
      <div className="mt-4">
        <h4>Adicionar Novo Acessório</h4>
        <input
          type="text"
          value={newAcessorio.tipo}
          onChange={(e) => setNewAcessorio({ ...newAcessorio, tipo: e.target.value })}
          placeholder="Tipo"
        />
        <input
          type="text"
          value={newAcessorio.preco}
          onChange={(e) => setNewAcessorio({ ...newAcessorio, preco: e.target.value })}
          placeholder="Preço"
        />
        <button className="btn btn-success ms-2" onClick={handleAddAcessorio}>
          Adicionar
        </button>
      </div>

      {/* Campo de busca */}
      <div className="mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar acessório..."
        />
        <button className="btn btn-primary ms-2" onClick={() => setSearchTerm('')}>
          Limpar
        </button>
      </div>

      <div className="row mt-4">
        {filteredAcessorios.map((acessorio) => (
          <div key={acessorio.id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                {editingAcessorio && editingAcessorio.id === acessorio.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingAcessorio.tipo}
                      onChange={(e) => setEditingAcessorio({ ...editingAcessorio, tipo: e.target.value })}
                      placeholder="Tipo"
                    />
                    <input
                      type="text"
                      value={editingAcessorio.preco}
                      onChange={(e) => setEditingAcessorio({ ...editingAcessorio, preco: e.target.value })}
                      placeholder="Preço"
                    />
                    <button className="btn btn-success ms-2" onClick={() => handleEditAcessorio(acessorio.id)}>
                      Salvar
                    </button>
                    <button className="btn btn-secondary ms-2" onClick={() => setEditingAcessorio(null)}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div>
                    <h5 className="card-title">{acessorio.tipo}</h5>
                    <p className="card-text">Preço: {acessorio.preco}</p>
                    <div>
                      <button className="btn btn-primary" onClick={() => setEditingAcessorio(acessorio)}>
                        Editar
                      </button>
                      <button className="btn btn-danger ms-2" onClick={() => handleDeleteAcessorio(acessorio.id)}>
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

export default Acessorios;
