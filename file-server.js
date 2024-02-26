const express = require('express');
const path = require('path');
const cors = require('cors');
const { BlobServiceClient } = require('@azure/storage-blob');
const { TableClient, AzureNamedKeyCredential, TableServiceClient } = require("@azure/data-tables");

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
const PORT = process.env.PORT || 3000;

app.use(cors());

const scriptName = path.basename(__filename, '.js');

app.get('/videos', async (req, res) => {
    try {
        const videos = await getVideosData();
        res.json(videos);
        await writeToLog('Videos requested successfully.', 'info');
    } catch (error) {
        await writeToLog(`Error fetching videos: ${error}`, 'error');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getVideosData() {
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME_VIDEOS);
    const videos = [];

    for await (const blob of containerClient.listBlobsFlat()) {
        const videoName = path.parse(blob.name).name;
        const videoPath = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME_VIDEOS}/${blob.name}`;
        const thumbnailPath = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME_THUMBNAILS}/${videoName}.png`;
        const gifPath = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME_GIFS}/${videoName}.gif`;

        videos.push({
            name: videoName,
            thumbnail: thumbnailPath,
            gif: gifPath,
            path: videoPath
        });
    }

    return videos;
}

app.listen(PORT, async () => {
    try {
        await writeToLog(`Server is running on port ${PORT}`, 'info');
    } catch (error) {
        await writeToLog("Erro ao iniciar o servidor:", 'error');
        await writeToLog(error.toString(), 'error');
        process.exit(1);
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
            await writeToLog(`Erro ao criar tabela ${tableName}: ${error}`, 'error');
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
        writeToLog("Erro ao registrar log:", error);
    }
}
