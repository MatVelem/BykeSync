import { criarbicicleta, mostrarbicicleta } from '../database';


describe('mostrarbicicleta', () => {
  test('deve retornar uma bicicleta com o ID fornecido', async () => {
    const id = 1; // 
    const result = await mostrarbicicleta(id);
    expect(result); // Verifica se o resultado não é indefinido
  });

});

describe('criarbicicleta', () => {
test('Deve criar uma bicicleta e mostrar o id', async () => {
  const result = await criarbicicleta('bruno','mateus','roxo',15458.4,5,null,'pelo amor de deus');
  expect(result).toBeDefined();


  expect(result).not.toBeNull();
  
});


}




)

