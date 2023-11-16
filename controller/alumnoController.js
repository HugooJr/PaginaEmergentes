const Alumno = require('../model/Alumnos');

let ip = "";
let country = "";
let city = "";

fetch("https://api.ipify.org?format=json")
  .then(response => response.json())
  .then(data => {
    const ipAddress = data.ip;

    // Llama a ipinfo.io para obtener información de geolocalización basada en la IP
    return fetch(`https://ipinfo.io/${ipAddress}?token=9f8e12d2c430aa`);
  })
  .then(response => response.json())
  .then(geoData => {
    country = geoData.country;
    city = geoData.city;
  })
  .catch(error => console.error(error));

module.exports.mostrar = (req, res) => {
    res.render('index');
};

module.exports.crear = (req, res)=>{
    //console.log(req.body)
    const alumno = new Alumno({
        frase: req.body.frase,
        reaccion: req.body.btnReaccion,
        colorFondo1: req.body.colorFondo1,
        colorFondo2: req.body.colorFondo2,
        edad: req.body.edad,
        positivismo: reglas(req.body.frase, req.body.btnReaccion),
        clientIp: ip,
        pais: country,
        ciudad: city,
        personalidad: tercerColor(req.body.colorFondo1, req.body.colorFondo2, req.body.color3)
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

function sacarRgb(color){
    const rgbArray = color.match(/\d+/g);
    // Asignar los componentes a variables separadas
    const red = parseInt(rgbArray[0]);
    const green = parseInt(rgbArray[1]);
    const blue = parseInt(rgbArray[2]);
    const sumaRgb = red + green + blue;
    const total = sumaRgb / 3;
    return total;
  }

function tercerColor(color1, color2, color3){
    let personalidad = "";
    // obtener Datos
    const colorBody = sacarRgb(color1);
    const colorTexto = sacarRgb(color3);
    const colorContenedor = sacarRgb(color2);
    // variables formula Cuzzi
    var resultado = "";
    var Vi = 0;
    var Vf = 0;
    var Vm = 0;
    Vf = parseInt(colorTexto);
    Vi = parseInt(colorBody);
    Vm = parseInt(colorContenedor);
    const mitadExtremos = (Vi + Vf) / 2;
    console.log(Vi + " " + Vm + " " + Vf);
    // Determinar si el tercer número está más inclinado hacia el extremo izquierdo o derecho
    if (Vm < mitadExtremos) {
        resultado = color1;
    } else if (Vm > mitadExtremos) {
        resultado = color3;
    } else {
        resultado = color2;
    }
    console.log(resultado);
    switch(resultado){
        case ("rgb(148, 0, 211)"):
            personalidad = "Realista, buen razonamiento y pensamiento práctico"
            break;
        case ("rgb(75, 0, 130)"):
            personalidad = "Valiosa y conservada"
            break;
        case ("rgb(0, 0, 255)"):
            personalidad = "Depresiva"
            break;
        case ("rgb(0, 255, 0)"):
            personalidad = "Introvertido y tranquilo"
            break;    
        case ("rgb(255, 255, 0)"):
            personalidad = "Alta autoestima"
            break;    
        case ("rgb(255, 127, 0)"):
            personalidad = "Extrovertido y vivaz"
            break;    
        case ("rgb(255, 0, 0)"):
            personalidad = "Agresiva y dominante"
            break;    
        default:
            personalidad = "Neutra"
            break;
    }
    // Extraer los componentes RGB
    return personalidad;
}

function reglas(frase, reaccion){
    // Supongamos que 'frase' es la variable que contiene la frase que deseas clasificar
    let positivismo, observacion;

    if (
        frase.includes("decidir") || frase.includes("soñadores") || frase.includes("optimista") ||
        frase.includes("felices") || frase.includes("protegerlo") || frase.includes("libre") ||
        frase.includes("cambiar") || frase.includes("fuerte") || frase.includes("correcta") ||
        frase.includes("vida") || frase.includes("regalo") || frase.includes("morir") ||
        frase.includes("feliz") || frase.includes("oportunidad") || frase.includes("quitar") ||
        frase.includes("mejor") || frase.includes("hazlo") || frase.includes("intentar") ||
        frase.includes("hombre") || frase.includes("libertad") || frase.includes("muerte") ||
        frase.includes("sueños") || frase.includes("acompañarte") || frase.includes("triste") 
    ) {
        //console.log("La frase es positiva.");

        switch (reaccion) {
            case "Me gusta":
                positivismo = true;
            observacion = "La persona parece tener una actitud positiva y apreciativa. Podría ser percibida como alguien optimista y que valora las experiencias positivas.";
            break;
            
            case "Me encanta":
                positivismo = true;
            observacion = "La persona muestra una reacción aún más positiva y entusiasta. Podría ser vista como alguien que se emociona fácilmente y encuentra gran placer en las experiencias positivas.";
            break;
            
            case "Me divierte":
                positivismo = true;
            observacion = "La persona podría ser percibida como alguien con un sentido del humor y una actitud alegre. Disfruta de la diversión y el humor en la vida.";
            break;
        
            case "Me sorprende":
                positivismo = true;
            observacion = "Indica que la persona encuentra las frases impactantes o inesperadas. Puede ser vista como alguien abierto a nuevas ideas y perspectivas, que aprecia la originalidad.";
            break;
        
            case "Me entristece":
                positivismo = false;
            observacion = "La persona se conmueve emocionalmente por las frases que contienen sentimientos de tristeza o reflexión. Puede ser vista como alguien empático y sensible a las emociones.";
            break;
        
            case "Me da asco":
                positivismo = false;
            observacion = "Sugiere una reacción negativa hacia las frases. La persona podría ser percibida como más crítica o menos receptiva a las ideas presentadas en las frases.";
            break;
        }

    } else if (
        frase.includes("muerte") || frase.includes("gorda") || frase.includes("estúpida") ||
        frase.includes("cabreado") || frase.includes("odio") || frase.includes("confesarme") ||
        frase.includes("arrepiento") || frase.includes("finales") || frase.includes("confesarme") ||
        frase.includes("muertes") || frase.includes("dañinas") || frase.includes("muerte") ||
        frase.includes("respuesta") || frase.includes("mentiras") || frase.includes("correcta") ||
        frase.includes("vida") || frase.includes("buen trabajo") || frase.includes("morir") ||
        frase.includes("confesarme") || frase.includes("repartirá") || frase.includes("morir") ||
        frase.includes("sueños") || frase.includes("esclavo") || frase.includes("océanos") ||
        frase.includes("triste") || frase.includes("fuerte") || frase.includes("correcta") ||
        frase.includes("arrepentirme") || frase.includes("buen trabajo") || frase.includes("dañinas") ||
        frase.includes("muerte") || frase.includes("respuesta") || frase.includes("amplitud") ||
        frase.includes("habilidades") || frase.includes("decisiones") || frase.includes("correcta") ||
        frase.includes("vida") || frase.includes("libertad") || frase.includes("emociones") ||
        frase.includes("triste") || frase.includes("fuerte")
    ) {
        //console.log("La frase es negativa.");
        // Supongamos que 'reaccion' es la variable que contiene la reacción, y 'frase' es la variable que contiene la frase

        switch (reaccion) {
        case 'Me gusta':
            positivismo = false;
            observacion = "La persona es comprensiva y puede apreciar la profundidad o la realidad de las declaraciones.";
            break;

        case 'Me encanta':
            positivismo = false;
            observacion = "La persona tiene una perspectiva positiva y puede estar enfocada en encontrar la belleza o el aprendizaje en situaciones desafiantes.";
            break;

        case 'Me divierte':
            positivismo = false;
            observacion = "La persona tiene un sentido del humor y puede encontrar ironía o sarcasmo en las declaraciones negativas.";
            break;

        case 'Me sorprende':
            positivismo = false;
            observacion = "La persona puede tener una reacción de asombro o incredulidad ante las declaraciones negativas.";
            break;

        case 'Me entristece':
            positivismo = true;
            observacion = "La persona muestra empatía y sensibilidad hacia las emociones negativas expresadas en las frases.";
            break;

        case 'Me da asco':
            positivismo = true;
            observacion = "La persona puede tener una reacción negativa directa a las declaraciones y puede ser vista como alguien que prefiere evitar o no apreciar contenido emocionalmente cargado o negativo.";
            break;
        }
    }
  
    return (positivismo);
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
