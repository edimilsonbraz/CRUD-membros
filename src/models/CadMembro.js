const db = require('../db');


const AddMembro = db.sequelize.define('usuarios',{
  nome: {
    type: db.Sequelize.STRING
  },
  email: {
    type: db.Sequelize.STRING
  },
  telefone: {
    type: db.Sequelize.STRING
  },
  sexo: {
    type: db.Sequelize.STRING
  },
  data_nasc: {
    type: db.Sequelize.DATE
  },
  cidade: {
    type: db.Sequelize.STRING
  },
  estado: {
    type: db.Sequelize.STRING
  },
  endereco: {
    type: db.Sequelize.STRING
  }
})



module.exports = AddMembro;

// AddMembro.sync({force: true});
