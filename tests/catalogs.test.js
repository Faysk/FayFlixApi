const request = require('supertest');
const express = require('express');
const catalogRouter = require('../routes/catalogRoutes');
const { getCatalogs } = require('../controllers/catalogController');

// Crie uma instância do aplicativo Express para testar o roteador de catálogos
const app = express();
app.use('/catalogs', catalogRouter);

// Teste para a rota GET '/catalogs'
describe('GET /catalogs', () => {
    it('should return a list of catalogs', async () => {
        // Defina um mock para a função getCatalogs do controller
        const mockCatalogs = [{ id: 1, name: 'Catalog 1' }, { id: 2, name: 'Catalog 2' }];
        jest.spyOn(require('../controllers/catalogController'), 'getCatalogs').mockImplementation(async () => mockCatalogs);

        // Faça uma requisição GET para a rota '/catalogs'
        const res = await request(app).get('/catalogs');

        // Verifique se a resposta possui status 200 (OK)
        expect(res.status).toEqual(200);

        // Verifique se a resposta contém uma lista de catálogos
        expect(res.body).toEqual(mockCatalogs);
    });
});

// Outros testes para outras rotas ou funcionalidades do roteador de catálogos podem ser adicionados aqui
