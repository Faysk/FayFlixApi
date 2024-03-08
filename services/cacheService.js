const NodeCache = require('node-cache');
const { getFilesData } = require('./blobService');
const { info, warn} = require('../utils/logger');

const cache = new NodeCache({ stdTTL: 3600 });

async function fetchData(containerName, accountName, sasToken) {
    // Defina uma chave única baseada nos parâmetros
    const cacheKey = `${containerName}-${accountName}`;

    let data = cache.get(cacheKey);
    if (!data) {
        warn(`${containerName} not found in cache. Fetching from storage.`);
        // Chame a função getFilesData com os parâmetros corretos
        data = await getFilesData(containerName, accountName, sasToken);
        cache.set(cacheKey, data);
    } else {
        info(`${containerName} found in cache.`);
    }
    return data;
}

module.exports = {
    fetchData,
};
