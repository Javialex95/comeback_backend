// Rutas para crear brands
const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenidoController')

// api/contenidos
router.get('/', contenidoController.getContenidos);
router.post('/', contenidoController.postContenido);
router.get('/:id', contenidoController.getContenido);

module.exports = router; 