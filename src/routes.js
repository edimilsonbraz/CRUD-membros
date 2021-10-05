const express = require('express');
const routes = express.Router();
const Addmembro = require('./models/CadMembro');
const moment = require('moment');
const session = require('express-session');
const flash = require('connect-flash');
const date = require('./views/utils/formatDate')

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
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  next();
})


// ROTAS
routes.get("/", (req, res) => res.render('index'))
routes.get("/login", (req, res) => res.render('login'))

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
    req.flash('success_msg', "Membro Criado com sucesso!")
    res.redirect('/membros')
  }).catch((erro) => {
    res.flash('error_msg', "Membro não pôde ser cadastrado!")
  })
})


//Carrega Form EDITAR MEMBRO
routes.get('/edit-membro/:id', (req, res) => {
  Addmembro.findByPk(req.params.id)
    .then(post => {
      res.render('edit-membro', {
        id: req.params.id,
        nome: post.nome,
        email: post.email,
        telefone: post.telefone,
        sexo: post.genero,
        data_nasc: post.data_nascimento,
        cidade: post.cidade,
        estado: post.estado,
        endereco: post.endereco
      })
    }).catch((erro) => {
      req.flash("error_msg", "Erro: Membro não encontrado!")
    })
})


//UPDATE NO BANCO MEMBRO
routes.post('/update-membro/:id', (req, res) => {
  Addmembro.update({
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    sexo: req.body.sexo,
    data_nasc: req.body.data_nasc,
    cidade: req.body.cidade,
    estado: req.body.estado,
    endereco: req.body.endereco
  }, {
    where: {id: req.params.id},
  }).then(() => {
    req.flash('success_msg', "Membro Editado com sucesso!")
    res.redirect('/membros')
  }).catch(erro => {
    req.flash("error_msg", "Erro: Membro não pôde ser editado!") 
  })
})


//VISUALIZAR MEMBRO
routes.get('/vis-membro/:id', (req, res) => {
  
  Addmembro.findByPk(req.params.id)
    .then(post => { 
      res.render('vis-membro', {
        id: req.params.id,
        nome: post.nome,
        email: post.email,
        telefone: post.telefone,
        sexo: post.sexo,
        data_nasc: post.data_nasc,
        cidade: post.cidade,
        estado: post.estado,
        endereco: post.endereco
      })
    }).catch((erro) => {
      req.flash("error_msg", "Erro: Membro não encontrado!")
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