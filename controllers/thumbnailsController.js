const { fetchData } = require('../services/cacheService');
const { STORAGE_ACCOUNT_NAME, SAS_TOKEN } = require('../config/config');

// Controlador para obter miniaturas
async function getThumbnails(req, res) {
    try {
        const thumbnails = await fetchData('thumbnails', STORAGE_ACCOUNT_NAME, SAS_TOKEN);
        res.json(thumbnails);
    } catch (error) {
        console.error('Erro ao obter miniaturas:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getThumbnails,
};
