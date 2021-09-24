const express = require('express');
const routes = express.Router();
const Addmembro = require('./models/CadMembro');
const moment = require('moment');

const basePath = __dirname + '/views';


// ROTAS
routes.get("/", (req, res) => res.render('index'))

routes.get("/membros", (req, res) =>  { 
  Addmembro.findAll().then((membro) => {
    res.render('membros', {membro: membro})})
  })


//Dados vindo do Formulario
routes.post("/membros", (req, res) => {
  Addmembro.create({
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    sexo: req.body.genero,
    data_nasc: req.body.data_nascimento,
    cidade: req.body.cidade,
    estado: req.body.estado,
    endereco: req.body.endereco
  }).then(() => {
    res.redirect('/membros')
  }).catch((erro) => {
    res.send("Erro: Membro não pôde ser cadastrado!")
  })
  
})

module.exports = routes;