const NodeCache = require('node-cache');

// Tempo de vida padrão para os itens do cache (em segundos)
const DEFAULT_TTL = 3600;

// Cria uma nova instância do NodeCache
const cache = new NodeCache({ stdTTL: DEFAULT_TTL });

/**
 * Obtém um item do cache.
 * @param {string} key - A chave do item no cache.
 * @returns {any} O valor do item do cache, ou undefined se não encontrado.
 */
function getFromCache(key) {
    return cache.get(key);
}

/**
 * Define um item no cache.
 * @param {string} key - A chave do item no cache.
 * @param {any} value - O valor a ser armazenado no cache.
 * @param {number} ttl - O tempo de vida (em segundos) do item no cache. Opcional.
 */
function setInCache(key, value, ttl = DEFAULT_TTL) {
    cache.set(key, value, ttl);
}

/**
 * Remove um item do cache.
 * @param {string} key - A chave do item no cache.
 * @returns {boolean} true se o item foi removido com sucesso, false se não encontrado.
 */
function removeFromCache(key) {
    return cache.del(key);
}

/**
 * Limpa todo o cache.
 */
function clearCache() {
    cache.flushAll();
}

module.exports = {
    getFromCache,
    setInCache,
    removeFromCache,
    clearCache
};
