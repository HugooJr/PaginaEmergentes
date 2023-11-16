const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alumnoSchema = new Schema ({
    frase: String,
    reaccion:String,
    colorFondo1:String,
    colorFondo2:String,
    edad:String,
    positivismo: Boolean,
    clientIp: String,
    pais: String,
    ciudad: String,
    personalidad: String
}, {versionKey:false})
module.exports = mongoose.model('alumnos', alumnoSchema)
