const express = require('express')
const router = express.Router()

const alumnoController = require('../controller/alumnoController')

//Mostrar todos los alumnos (GET)
router.get('/', alumnoController.mostrar)
//Crear alumno (POST)
router.post('/crear', alumnoController.crear)

module.exports = router
