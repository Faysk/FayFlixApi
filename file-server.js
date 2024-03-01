const express = require('express');
const path = require('path');
const cors = require('cors');
const { BlobServiceClient } = require('@azure/storage-blob');
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const accountKey = "qcaWdF91e3ggHLN5vhJUVZuK+gsvN5/5Dd+jrlssPvEKQ9lkus3bTeQ6B5/h0gsbIzTgJxuE7wWM+ASthguHEg==";
const STORAGE_ACCOUNT_NAME = 'storagefayflix';
const accountName = STORAGE_ACCOUNT_NAME;
const SAS_TOKEN = 'sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2100-09-03T06:38:49Z&st=2024-02-25T22:38:49Z&spr=https&sig=NCvGeGUAsABxeUnpb%2FddzOcKnjB91oS8bHabKyrCcJk%3D';
const CONTAINER_NAME_VIDEOS = "videos";
const CONTAINER_NAME_GIFS = "gifs";
const CONTAINER_NAME_THUMBNAILS = "thumbnails";

const blobServiceClient = new BlobServiceClient(
    `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net?${SAS_TOKEN}`
);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const scriptName = path.basename(__filename, '.js');

app.get('/videos', async (req, res) => {
    try {
        const videos = await getFilesData(CONTAINER_NAME_VIDEOS);
        res.json(videos);
        await writeToLog('Videos requested successfully.', 'info');
    } catch (error) {
        handleServerError(error, 'fetching videos', res);
    }
});

app.get('/gifs', async (req, res) => {
    try {
        const gifs = await getFilesData(CONTAINER_NAME_GIFS);
        res.json(gifs);
        await writeToLog('GIFs requested successfully.', 'info');
    } catch (error) {
        handleServerError(error, 'fetching GIFs', res);
    }
});

app.get('/thumbnails', async (req, res) => {
    try {
        const thumbnails = await getFilesData(CONTAINER_NAME_THUMBNAILS);
        res.json(thumbnails);
        await writeToLog('Thumbnails requested successfully.', 'info');
    } catch (error) {
        handleServerError(error, 'fetching thumbnails', res);
    }
});

async function getFilesData(containerName) {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const files = [];

        for await (const blob of containerClient.listBlobsFlat()) {
            const fileName = path.parse(blob.name).name;
            const filePath = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${blob.name}`;

            files.push({
                name: fileName,
                path: filePath
            });
        }

        return files;
    } catch (error) {
        throw new Error(`Error fetching files from container ${containerName}: ${error.message}`);
    }
}

app.listen(PORT, async () => {
    try {
        await writeToLog(`Server is running on port ${PORT}`, 'info');
    } catch (error) {
        handleServerError(error, 'starting server');
    }
});

const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
const year = new Date().getFullYear().toString();
const endpoint = "https://storagefayflix.table.core.windows.net/";
const tableName = `${scriptName.replace('-', '')}${month}${year}`;

const credential = new AzureNamedKeyCredential(accountName, accountKey);
const tableClient = new TableClient(endpoint, tableName, credential);

(async () => {
    try {
        await tableClient.createTable(tableName);
    } catch (error) {
        if (error.statusCode !== 409) {
            handleServerError(error, `creating table ${tableName}`);
        }
    }
})();

async function writeToLog(message, logType) {
    try {
        const logEntity = {
            partitionKey: logType,
            rowKey: new Date().toISOString(),
            message: message
        };

        await tableClient.createEntity(logEntity);
    } catch (error) {
        handleServerError(error, 'writing to log');
    }
}

function handleServerError(error, action, res) {
    console.error(`Error ${action}:`, error);
    if (res) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
