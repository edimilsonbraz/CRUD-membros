// CONECAO COM O BANCO
const Sequelize = require('sequelize');

const sequelize = new Sequelize('form_membros', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

sequelize.authenticate().then(() => {
  console.log('Conexão realizada com sucesso!')
}).catch((err) => {
  console.log('Erro ao realizar a conexão com DB: ' + err)
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}


//========================================================
