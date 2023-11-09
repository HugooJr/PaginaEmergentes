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
        if(error){
            return res.status(500).json({
                message: 'Error al crear el Alumno'
            })
        }
        res.redirect('/')
    })
}

module.exports.editar = (req,res)=>{
    const id = req.body.id_editar
    const nombre = req.body.nombre_editar
    const edad = req.body.edad_editar
    const materia=req.body.materia_editar
    const semestre=req.body.semestre_editar
    Alumno.findByIdAndUpdate(id, {nombre, edad,materia,semestre}, (error, alumno)=>{
        if(error){
            return res.status(500).json({
                message: 'Error actualizando el Alumno'
            })
        }
        res.redirect('/')
    })
}

//Borrar
module.exports.borrar = (req, res)=>{
    const id = req.params.id
    Alumno.findByIdAndRemove(id, (error, alumno)=>{
        if(error){
            return res.status(500).json({
                message: 'Error eliminando el Alumno'
            })
        }
        res.redirect('/')
    })
}
