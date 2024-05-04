import { criarbicicleta, mostrarbicicleta, apagarBicicleta  } from '../database';


import { criarusuario } from "../database";
//import { mostrarbicicleta } from '../database';
//import { pegarbicicleta } from '../database';
//import { criarbicicleta } from '../database';
/*describe('mostrarbicicleta', () => {
  test('deve retornar uma lista de bicicletas', async () => {
    const result = await mostrarbicicleta();
    expect(Array.isArray(result)).toBe(true); // Verifica se o resultado é um array
    // Adicione mais asserções conforme necessário
  });
});
*/
//teste de usuario
export async function criarusuario(nome, email, senha, endereco, telefone, tipo_usuario, foto) {
  const [result] = await pool.query(`
    INSERT INTO usuarios (nome, email, senha, endereco, telefone, tipo_usuario)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [nome, email, senha, endereco, telefone, tipo_usuario]);
  const id = result.insertId;
  return getUser(id);
}
/*describe('mostrarbicicleta', () => {
  test('deve retornar uma bicicleta com o ID fornecido', async () => {
    const id = 1; // 
    const result = await mostrarbicicleta(id);
    expect(result); // Verifica se o resultado não é indefinido
  });

});


/*describe('criarbicicleta', () => {
  test('deve criar uma nova bicicleta e retornar o ID', async () => {
    const novaBicicleta = { marca: 'Caloi', modelo: 'Sport', cor: 'Preto', preco: 1500, estoque: 5, foto: 'example.jpg', descricao: 'Bicicleta esportiva' };
    const result = await criarbicicleta(novaBicicleta.marca, novaBicicleta.modelo, novaBicicleta.cor, novaBicicleta.preco, novaBicicleta.estoque, novaBicicleta.foto, novaBicicleta.descricao);
    expect(result).toBeGreaterThan(0); // Verifica se o ID retornado é maior que zero
    // Adicione mais asserções conforme necessário
  });
});*/