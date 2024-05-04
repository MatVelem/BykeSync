import { criarbicicleta, mostrarbicicleta, apagarBicicleta, criarusuario, apagarUsuario  } from '../database';




describe('criarusuario', () => {
  let idCriado; 

  test('Deve criar um usuário e retornar o ID', async () => {
    idCriado = await criarusuario('João', 'joao@example.com', 'senha123', 'Rua A, 123', '123456789', 'cliente', 'foto.jpg');
    expect(idCriado).toBeGreaterThan(0); // Verifica se o ID retornado é maior que zero
  });

  afterAll(async () => {
    if (idCriado) {
      await apagarUsuario(idCriado); 
    }
  });
});

describe('mostrarbicicleta', () => {
  test('deve retornar uma bicicleta com o ID fornecido', async () => {
    const id = 1; // 
    const result = await mostrarbicicleta(id);
    expect(result); // Verifica se o resultado não é indefinido
  });

});

describe('criarbicicleta', () => {
  let idCriado; 

  test('Deve criar uma bicicleta e mostrar o id', async () => {
    const result = await criarbicicleta('bruno','mateus','roxo',15458.4,5,null,'pelo amor de deus');
    expect(result).toBeDefined();
    idCriado = result; 
  });


  afterAll(async () => {
    if (idCriado) {
      await apagarBicicleta(idCriado);
    }
  });
});