const request = require('supertest');
const express = require('express');
const thumbnailsRouter = require('../routes/thumbnailsRoutes');
const { getThumbnails } = require('../controllers/thumbnailsController');

// Crie uma instância do aplicativo Express para testar o roteador de miniaturas
const app = express();
app.use('/thumbnails', thumbnailsRouter);

// Teste para a rota GET '/thumbnails'
describe('GET /thumbnails', () => {
    it('should return a list of thumbnails', async () => {
        // Defina um mock para a função getThumbnails do controller
        const mockThumbnails = [{ id: 1, imageUrl: 'thumbnail1.jpg' }, { id: 2, imageUrl: 'thumbnail2.jpg' }];
        jest.spyOn(require('../controllers/thumbnailsController'), 'getThumbnails').mockImplementation(async () => mockThumbnails);

        // Faça uma requisição GET para a rota '/thumbnails'
        const res = await request(app).get('/thumbnails');

        // Verifique se a resposta possui status 200 (OK)
        expect(res.status).toEqual(200);

        // Verifique se a resposta contém uma lista de miniaturas
        expect(res.body).toEqual(mockThumbnails);
    });
});

// Outros testes para outras rotas ou funcionalidades do roteador de miniaturas podem ser adicionados aqui
