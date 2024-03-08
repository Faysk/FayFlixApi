const express = require('express');
const { getVideos } = require('../controllers/videosController');

const router = express.Router();

// Rota para obter vídeos
router.get('/', getVideos);

module.exports = router;
