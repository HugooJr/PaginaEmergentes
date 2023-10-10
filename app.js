const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('trust proxy', true);
app.use(express.static('public'))

const alumnos = require('./routes/alumnos')
app.use(alumnos)

app.get('/', (req, res)=>{
    res.send('hola mundo')
})

app.listen(3000, ()=>{
    console.log('¡Server UP! en http://localhost:3000')
})