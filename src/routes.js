const express = require('express');
const routes = express.Router();
const Addmembro = require('./models/CadMembro');
const moment = require('moment');

const basePath = __dirname + '/views';


// ROTAS
routes.get("/", (req, res) => res.render('index'))

// LIST MEMBRO
routes.get("/membros", (req, res) =>  { 
  Addmembro.findAll().then((membro) => {
    res.render('membros', {membro: membro})})
  })


//CREATE MEMBRO
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

routes.get('/del-membro/:id', (req, res) => {
  Addmembro.destroy({
    where: { 'id': req.params.id }
  }).then(() => {
    res.redirect('/membros')
  }).catch((erro) => {
    res.send("Membro não pôde ser apagado.")
  })
})

module.exports = routes;