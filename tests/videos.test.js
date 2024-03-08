const request = require('supertest');
const express = require('express');
const videosRouter = require('../routes/videosRoutes');
const { getVideos } = require('../controllers/videosController');

// Crie uma instância do aplicativo Express para testar o roteador de vídeos
const app = express();
app.use('/videos', videosRouter);

// Teste para a rota GET '/videos'
describe('GET /videos', () => {
    it('should return a list of videos', async () => {
        // Defina um mock para a função getVideos do controller
        const mockVideos = [{ id: 1, title: 'Video 1' }, { id: 2, title: 'Video 2' }];
        jest.spyOn(require('../controllers/videosController'), 'getVideos').mockImplementation(async () => mockVideos);

        // Faça uma requisição GET para a rota '/videos'
        const res = await request(app).get('/videos');

        // Verifique se a resposta possui status 200 (OK)
        expect(res.status).toEqual(200);

        // Verifique se a resposta contém uma lista de vídeos
        expect(res.body).toEqual(mockVideos);
    });
});

// Outros testes para outras rotas ou funcionalidades do roteador de vídeos podem ser adicionados aqui
