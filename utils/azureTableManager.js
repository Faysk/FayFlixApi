const { TableServiceClient, AzureNamedKeyCredential } = require("@azure/data-tables");
const { STORAGE_ACCOUNT_KEY, STORAGE_ACCOUNT_NAME } = require('../config/config');

const endpoint = `https://${STORAGE_ACCOUNT_NAME}.table.core.windows.net`;
const credential = new AzureNamedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCOUNT_KEY);
const tableServiceClient = new TableServiceClient(endpoint, credential);

async function createTableIfNotExists(tableName) {
    try {
        if (!await tableExists(tableName)) {
            console.log(`Creating table ${tableName}...`);
            await tableServiceClient.createTable(tableName);
            console.log(`Table ${tableName} created successfully.`);
        } else {
            console.log(`Table ${tableName} already exists.`);
        }
    } catch (error) {
        console.error(`Error creating table ${tableName}:`, error);
        throw error;
    }
}

async function tableExists(tableName) {
    let exists = false;
    for await (const table of tableServiceClient.listTables()) {
        if (table.name === tableName) {
            exists = true;
            break;
        }
    }
    return exists;
}

module.exports = {
    createTableIfNotExists,
};
