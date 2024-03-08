const express = require('express');
const { getGifs } = require('../controllers/gifsController');

const router = express.Router();

// Rota para obter GIFs
router.get('/', getGifs);

module.exports = router;
