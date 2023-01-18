const express = require('express');
const app = express();
const mysql = require('mysql2');
//Motor de plantilla
const hbs = require('hbs');
//Encontrar archivos
const path = require('path');
//Para enviar mails
const nodemailer = require('nodemailer');
//Variables de entorno
require('dotenv').config();

//Configuramos el Puerto
const PORT = process.env.PORT || 9000; 

//Middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

//Configuramos el motor de plantillas de HBS
app.set('view engine', 'hbs');
//Configuramos la ubicación de las plantillas
app.set('views', path.join(__dirname, 'views'));
//Configuramos los parciales de los motores de plantillas
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//Conexión a la Base de Datos
    const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})
conexion.connect((err) =>{
    if(err) throw err;
    console.log(`Conectado a la Database ${process.env.DATABASE}`);
})  

//Rutas de la Aplicación
app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Home'
    })
})

app.get('/formulario', (req, res) => {
    res.render('formulario')
})

app.get('/productos', (req, res) => {
    
    /* let sql = "SELECT * FROM productos";
    conexion.query(sql, function(err, result){
        if (err) throw err;
        console.log(result);
        res.render('productos', {
            titulo: 'Productos',
            datos: result
        })
    }) */

    res.render('sinDatos')
})

app.get('/contacto', (req, res) =>{
    res.render('contacto', {
        titulo: 'Contacto'
    })
})

app.post('/login', (req, res) =>{
    const user = req.body.user;
    const password = req.body.password;

    console.log(`${user} - ${password}`);

    if (user === 'admin' && password === 'kf3j5j24') {
        res.render('admin')
    }else{
        res.render('error')
    }
})

app.post('/formulario', (req, res) =>{ /*   
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const codigo = req.body.codigo;

    let datos = {
        nombre: nombre,
        precio: precio,
        codigo: codigo
    } 


    let sql = "INSERT INTO productos set ?";
    conexion.query(sql, datos, function(err){
        if (err) throw err;
            console.log(`1 Registro insertado`);
            res.render('enviado')
        })  */

    res.render('sinDatos')
})

app.post('/contacto', (req, res) =>{
    const nombre = req.body.nombre;
    const email = req.body.email;

    //Creamos una función para enviar Email al cliente
    async function envioMail(){
        //Configuramos la cuenta del envío
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASSWORD
            }
        });

        //Envío del mail
        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: `${email}`,
            subject: "Gracias por elegirnos!!",
            html:`Muchas gracias por visitar nuestra página <br>
            En breve recibiras informacion sobre tu pedido <br>
            Ante cualquier duda contactese con nosotros.
            `
        })
    }

    let datos = {
        nombre: nombre,
        email: email
    }/*

    let sql = "INSERT INTO contactos set ?";
    conexion.query(sql, datos, function(err){
        if (err) throw err;
            console.log(`1 Registro insertado`);
            //Email
            envioMail().catch(console.error);
            res.render('enviado')
        }) */

        res.json({
            prueba: 'Probando deploy sin conexion a la Database'
        })

})

app.post('/delete', (req, res) => {

    /*console.log(req.body.idProducto);

    let sql = "DELETE FROM productos where idProducto = " + req.body.idProducto + "";
    console.log(sql);
    conexion.query(sql, function(err, result){
        if (err) throw err;
            console.log('Dato eliminado: ' + result.affectedRows);
            res.render('formulario')
    }) */

    res.json({
        prueba: 'Deploy sin conexion a la Database'
    })
})


app.post('/update', (req, res) => {/*

    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const codigo = req.body.codigo;
    const idProducto = req.body.idProducto;

    let sql = "UPDATE productos SET nombre = '" 
    + nombre 
    + "', precio = '" 
    + precio 
    + "', codigo = '" 
    + codigo
    + "' WHERE idProducto = " 
    + idProducto;
    console.log(sql);
    //res.send(sql)
    conexion.query(sql, function(err, result){
        if (err) throw err;
            console.log('Dato Actualizado: ' + result.affectedRows);
            res.render('formulario')
    }) */

    res.json({
        prueba: 'Deploy sin conexion a la Database'
    })

})

//Servidor a la escucha de las peticiones
app.listen(PORT, ()=>{
    console.log(`Servidor trabajando en el Puerto: ${PORT}`);
})