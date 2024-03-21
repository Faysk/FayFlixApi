    // Informações da conta de armazenamento
const STORAGE_ACCOUNT_KEY = "qcaWdF91e3ggHLN5vhJUVZuK+gsvN5/5Dd+jrlssPvEKQ9lkus3bTeQ6B5/h0gsbIzTgJxuE7wWM+ASthguHEg==";
const STORAGE_ACCOUNT_NAME = 'storagefayflix';
const ACCOUNT_NAME = STORAGE_ACCOUNT_NAME;
const SAS_TOKEN = 'sv=2022-11-02&ss=b&srt=c&sp=rltf&se=2100-03-21T20:48:47Z&st=2024-03-21T12:48:47Z&spr=https&sig=%2BL2XIuizFRdfb24%2BrGwWcQhgoyIDuGmy6Y4emMBKVAA%3D';
const CONTAINER_NAME_VIDEOS = "videos";
const CONTAINER_NAME_GIFS = "gifs";
const CONTAINER_NAME_THUMBNAILS = "thumbnails";
const CONTAINER_NAME_CATALOGS = "catalogs";

module.exports = {
    STORAGE_ACCOUNT_NAME,
    SAS_TOKEN,
    STORAGE_ACCOUNT_KEY,
    ACCOUNT_NAME,
    CONTAINER_NAME_VIDEOS,
    CONTAINER_NAME_GIFS,
    CONTAINER_NAME_THUMBNAILS,
    CONTAINER_NAME_CATALOGS
};
