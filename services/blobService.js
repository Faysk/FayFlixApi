const path = require('path');
const slugify = require('slugify');
const { SAS_TOKEN } = require('../config/config'); 
const { BlobServiceClient } = require('@azure/storage-blob');

async function getFilesData(containerName, accountName, SAS_TOKEN) {
    try {
        const blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net?${SAS_TOKEN}`
        );

        const containerClient = blobServiceClient.getContainerClient(containerName);
        const files = [];

        for await (const blob of containerClient.listBlobsFlat()) {
            const fileName = path.parse(blob.name).name;
            const filePath = `https://${blobServiceClient.accountName}.blob.core.windows.net/${containerName}/${blob.name}`;

            // console.log(`Successfully retrieved file: ${filePath}`);

            files.push({
                name: fileName,
                path: filePath,
                alias: slugify(fileName.toLowerCase(), '-')
            });
        }

        // console.log(`Successfully retrieved files from container: ${containerName}`);
        return files;
    } catch (error) {
        console.error(`Error retrieving files from container ${containerName}:`, error);
        throw error;
    }
}

module.exports = {
    getFilesData,
};
