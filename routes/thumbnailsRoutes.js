const express = require('express');
const { getThumbnails } = require('../controllers/thumbnailsController');

const router = express.Router();

// Rota para obter miniaturas
router.get('/', getThumbnails);

module.exports = router;
