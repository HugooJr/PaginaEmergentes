const fetch = require('node-fetch');
const Alumno = require('../model/Alumnos')

module.exports.mostrar = (req, res) => {
    res.render('index');
};

module.exports.crear = (req, res)=>{
    
    //console.log(req.body)
    const alumno = new Alumno({
        frase: req.body.frase,
        reaccion: req.body.btnReaccion,
        colorFondo1: req.body.colorFondo1,
        colorFondo2:req.body.colorFondo2,
        edad: req.body.edad
    })
    alumno.save(function(error,alumno){
        res.redirect('/')
    })
}
