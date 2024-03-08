const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");
const { STORAGE_ACCOUNT_KEY, STORAGE_ACCOUNT_NAME } = require('../config/config');
const { createTableIfNotExists } = require('./azureTableManager');

async function writeToLog(message, logType) {
    try {
        const tableName = getTableName();
        await createTableIfNotExists(tableName);

        const endpoint = `https://${STORAGE_ACCOUNT_NAME}.table.core.windows.net`;
        const credential = new AzureNamedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCOUNT_KEY);
        const tableClient = new TableClient(endpoint, tableName, credential);

        const logEntity = {
            partitionKey: logType,
            rowKey: new Date().toISOString(),
            message: message
        };

        await tableClient.createEntity(logEntity);
    } catch (error) {
        console.error('Error writing to log:', error);
    }
}

function getTableName() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `logtable${day}${month}${year}`;
}

function info(message) {
    console.log(`[INFO] ${message}`);
    writeToLog(message, 'info');
}

function warn(message) {
    console.warn(`[WARN] ${message}`);
    writeToLog(message, 'warn');
}

function error(message) {
    console.error(`[ERROR] ${message}`);
    writeToLog(message, 'error');
}

module.exports = {
    info,
    warn,
    error,
};
