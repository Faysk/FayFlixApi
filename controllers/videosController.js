const { fetchData } = require('../services/cacheService');
const { STORAGE_ACCOUNT_NAME, SAS_TOKEN } = require('../config/config');

// Controlador para obter vídeos
async function getVideos(req, res) {
    try {
        const videos = await fetchData('videos', STORAGE_ACCOUNT_NAME, SAS_TOKEN);
        res.json(videos);
    } catch (error) {
        console.error('Erro ao obter vídeos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getVideos,
};
