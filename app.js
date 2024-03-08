const express = require('express');
const cors = require('cors');
const videosRouter = require('./routes/videosRoutes');
const gifsRouter = require('./routes/gifsRoutes');
const thumbnailsRouter = require('./routes/thumbnailsRoutes');
const errorHandler = require('./middleware/errorHandler');
const { getFilesData } = require('./services/blobService');
const { info } = require('./utils/logger');
const { SAS_TOKEN, STORAGE_ACCOUNT_NAME, CONTAINER_NAME_VIDEOS, CONTAINER_NAME_GIFS, CONTAINER_NAME_THUMBNAILS } = require('./config/config');

// Função assíncrona para inicializar o aplicativo
async function initializeApp() {
    // Obtendo os dados dos arquivos dos contêineres de armazenamento
    const videosFiles = await getFilesData(CONTAINER_NAME_VIDEOS, STORAGE_ACCOUNT_NAME, SAS_TOKEN);
    const gifsFiles = await getFilesData(CONTAINER_NAME_GIFS, STORAGE_ACCOUNT_NAME, SAS_TOKEN);
    const thumbnailsFiles = await getFilesData(CONTAINER_NAME_THUMBNAILS, STORAGE_ACCOUNT_NAME, SAS_TOKEN);

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middleware para registrar todas as requisições recebidas
    app.use((req, res, next) => {
        info(`Received ${req.method} request to ${req.path} from ${req.ip}`);
        next();
    });

    app.use(cors());
    app.use('/videos', videosRouter);
    app.use('/gifs', gifsRouter);
    app.use('/thumbnails', thumbnailsRouter);
    app.use(errorHandler);

    app.listen(PORT, () => {
        info(`Server is running on port ${PORT}`);
    });
}

// Chamar a função de inicialização do aplicativo
initializeApp().catch(error => {
    error('Error initializing app:', error);
});
