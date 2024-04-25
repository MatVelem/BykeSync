const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); // Substitua por ./' se necessário
const { expect } = chai;
chai.use(chaiHttp);

describe('API de Bicicletas', () => {
  // Variáveis para testes
  const novaBicicleta = {
    marca: 'Caloi',
    modelo: 'Mountain Bike',
    preco: 1500.00
  };

  // Teste para Inserir Bicicleta
  describe('POST /bicicletas', () => {
    it('deve inserir uma nova bicicleta', (done) => {
      chai.request(app)
        .post('/bicicletas')
        .send(novaBicicleta)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('marca').to.equal(novaBicicleta.marca);
          expect(res.body).to.have.property('modelo').to.equal(novaBicicleta.modelo);
          expect(res.body).to.have.property('preco').to.equal(novaBicicleta.preco);
          done();
        });
    });
  });

  // Teste para Buscar Todas as Bicicletas
  describe('GET /bicicletas', () => {
    it('deve retornar todas as bicicletas', (done) => {
      chai.request(app)
        .get('/bicicletas')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]).to.have.property('marca');
          expect(res.body[0]).to.have.property('modelo');
          expect(res.body[0]).to.have.property('preco');
          done();
        });
    });
  });
});