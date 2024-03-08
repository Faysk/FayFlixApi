    // Informações da conta de armazenamento
const STORAGE_ACCOUNT_KEY = "qcaWdF91e3ggHLN5vhJUVZuK+gsvN5/5Dd+jrlssPvEKQ9lkus3bTeQ6B5/h0gsbIzTgJxuE7wWM+ASthguHEg==";
const STORAGE_ACCOUNT_NAME = 'storagefayflix';
const ACCOUNT_NAME = STORAGE_ACCOUNT_NAME;
const SAS_TOKEN = 'sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2100-09-03T06:38:49Z&st=2024-02-25T22:38:49Z&spr=https&sig=NCvGeGUAsABxeUnpb%2FddzOcKnjB91oS8bHabKyrCcJk%3D';
const CONTAINER_NAME_VIDEOS = "videos";
const CONTAINER_NAME_GIFS = "gifs";
const CONTAINER_NAME_THUMBNAILS = "thumbnails";

module.exports = {
    STORAGE_ACCOUNT_NAME,
    SAS_TOKEN,
    STORAGE_ACCOUNT_KEY,
    ACCOUNT_NAME,
    CONTAINER_NAME_VIDEOS,
    CONTAINER_NAME_GIFS,
    CONTAINER_NAME_THUMBNAILS
};
