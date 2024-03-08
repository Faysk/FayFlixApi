const { fetchData } = require('../services/cacheService');
const { STORAGE_ACCOUNT_NAME, SAS_TOKEN } = require('../config/config');

// Controlador para obter GIFs
async function getGifs(req, res) {
    try {
        const gifs = await fetchData('gifs', STORAGE_ACCOUNT_NAME, SAS_TOKEN);
        res.json(gifs);
    } catch (error) {
        console.error('Erro ao obter GIFs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getGifs,
};
