const express = require('express');
const { getCatalogs } = require('../controllers/catalogController');

const router = express.Router();

// Rota para obter catálogos
router.get('/', getCatalogs);

module.exports = router;
