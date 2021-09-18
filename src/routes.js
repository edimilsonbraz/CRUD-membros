const express = require('express');
const routes = express.Router();


const basePath = __dirname + '/views';


// ROTAS
routes.get("/", (req, res) => res.render(basePath + '/index'))
routes.get("/membros", (req, res) => res.render(basePath + '/listar-membros'))


// Dados vindo do Formulario
routes.post("/cad-membro", (req, res) => {
  res.send("Nome: " + req.body.nome + "<br> Email: " + req.body.email + "<br>") 
})

module.exports = routes;