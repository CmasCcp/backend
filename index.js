const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const cors = require('cors');
const { dbConnection } = require('./database/mysqlConfig');
const path = require("path");
const fs = require("fs");
const marked = require("marked");

// Crear el servidor de express
const app = express();
app.use(bodyParser.json());

// Base de datos
dbConnection;

// CORS
app.use(cors());

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/projects', require('./routes/projects') );
app.use('/api', (req, res)=> {
    fs.readFile("./views/documentacion.md", "utf8", (err, data)=>{
        if(err){
            res.status(404).send("Archivo no encontrado.");
        }else{
            const html = marked.parse(data);
            res.send(html);
        }
    })

});
app.use('/', (req, res)=> res.sendFile(path.join(__dirname,"public/index.html")) );

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

