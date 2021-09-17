const express = require('express');

const server = express();

server.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

// CONEXAO COM DB
const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'form_membros'
});

connection.connect(function(err) {
  if (err) {
    console.error('Erro ao Conectar com DB: ' + err.stack);
    return;
  }
 
  console.log('Conectado com DB ' + connection.threadId);
});connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

// PORTA ABERTA RODANDO
server.listen(3000, () => console.log('Server rodando'))