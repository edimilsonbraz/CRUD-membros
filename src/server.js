const express = require('express');
const bodyParser = require('body-parser');

const server = express();



// Parse Application - recebe dados do front-end(formulario)
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());


// ROTAS
server.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

server.post("/cad-membro", (req, res) => {
  res.send("Nome: " + req.body.nome + "<br> Email: " + req.body.email + "<br>") 
})



// PORTA ABERTA RODANDO
server.listen(3000, () => console.log('Server rodando'))