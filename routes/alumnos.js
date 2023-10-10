const express = require('express')
const router = express.Router()

const alumnoController = require('../controller/alumnoController')

//Mostrar todos los alumnos (GET)
router.get('/', alumnoController.mostrar)
//Crear alumno (POST)
router.post('/enviar', alumnoController.enviar)

module.exports = router