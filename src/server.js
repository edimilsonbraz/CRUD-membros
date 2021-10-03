const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const routes = require('./routes');
const path = require('path');


// Usando o template engine EJS
server.set('view engine', 'ejs');
// Mudando a localizacao da pasta wiews
server.set('views', path.join(__dirname, 'views'))


// Parse Application - recebe dados do front-end(formulario)
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

// Habilita os arquivos statics
server.use(express.static(path.join(__dirname, "public")))
server.use(express.urlencoded({ extended: true}))

// Rotas
server.use(routes)

// PORTA ABERTA RODANDO
server.listen(3000, () => console.log('Server rodando'))