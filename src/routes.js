const express = require('express');
const routes = express.Router();
const addmembro = require('./models/CadMembro')


const basePath = __dirname + '/views';


// ROTAS
routes.get("/", (req, res) => res.render(basePath + '/index'))


routes.get("/membros", (req, res) => res.render(basePath + '/listar-membros'))


//Dados vindo do Formulario
routes.post("/membros", (req, res) => {
  addmembro.create({
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    sexo: req.body.sexo,
    data_nasc: req.body.data_nascimento,
    cidade: req.body.cidade,
    estado: req.body.estado,
    endereco: req.body.endereco
  }).then(() => {
    res.redirect('/membro')
  }).catch((erro) => {
    res.send("Erro: Membro não pôde ser cadastrado!")
  })
  // res.send("Nome: " + req.body.nome + "<br> Email: " + req.body.email + "<br> Telefone: " + req.body.telefone + "<br> Sexo: " + req.body.sexo + "<br> Data de Nascimento: " + req.body.data_nasc + "<br> Cidade: " + req.body.cidade + "<br> Estado: " + req.body.estado + "<br> Endereço: " + req.body.endereco + "<br>")
})

module.exports = routes;