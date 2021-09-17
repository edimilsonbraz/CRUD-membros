const express = require('express');

const server = express();

server.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

// PORTA ABERTA RODANDO
server.listen(3000, () => console.log('Server rodando'))