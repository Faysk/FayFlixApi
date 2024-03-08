const request = require('supertest');
const express = require('express');
const gifsRouter = require('../routes/gifsRoutes');

// Crie uma instância do aplicativo Express para testar o roteador de GIFs
const app = express();
app.use('/gifs', gifsRouter);

// Teste para a rota GET '/gifs'
describe('GET /gifs', () => {
    it('should return a list of GIFs', async () => {
        // Faça uma requisição GET para a rota '/gifs'
        const res = await request(app).get('/gifs');

        // Verifique se a resposta possui status 200 (OK)
        expect(res.status).toEqual(200);

        // Verifique se a resposta contém uma lista de GIFs
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);

        // Você pode adicionar mais verificações conforme necessário
    });
});

// Outros testes para outras rotas ou funcionalidades do roteador de GIFs podem ser adicionados aqui

// Execute os testes com Jest ou usando um script de execução de testes personalizado
