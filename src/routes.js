const express = require('express');
const routes = express.Router();
const Addmembro = require('./models/CadMembro');
const moment = require('moment');
const session = require('express-session');
const flash = require('connect-flash');

// SESSÃO
routes.use(session({
  secret: 'membrossession',
  resave: true,
  saveUninitialized: true
}));
// O flash é uma área especial da sessão usada para armazenar mensagens.
routes.use(flash())
//Middleware
routes.use((req, res, next) => {
  res.locals.sucess_msg = req.flash("sucess_msg")
  res.locals.error_msg = req.flash("error_msg")
  next();
})


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

//DELETAR MEMBRO
routes.get('/del-membro/:id', (req, res) => {
  Addmembro.destroy({
    where: { 'id': req.params.id }
  }).then(() => {
    req.flash('success_msg', "Membro apagado com sucesso")
    res.redirect('/membros')
  }).catch((erro) => {
    req.flash('error_msg', "Membro não pôde ser deletado")
    //res.send("Membro não pôde ser apagado.")
  })
})

module.exports = routes;