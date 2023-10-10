const mongoose = require('mongoose')
const Schema = mongoose.Schema
const alumnoSchema = new Schema ({
    frase: String,
    reaccion:String,
    fecha:String,
    semestre:Number,
}, {versionKey:false})
module.exports = mongoose.model('alumnos', alumnoSchema)