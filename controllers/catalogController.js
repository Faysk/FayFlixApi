const { fetchData } = require('../services/cacheService');
const { STORAGE_ACCOUNT_NAME, SAS_TOKEN } = require('../config/config');

// Controlador para obter catálogos
async function getCatalogs(req, res) {
    try {
        const catalogs = await fetchData('catalogs', STORAGE_ACCOUNT_NAME, SAS_TOKEN);
        res.json(catalogs);
    } catch (error) {
        console.error('Erro ao obter catálogos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getCatalogs,
};
