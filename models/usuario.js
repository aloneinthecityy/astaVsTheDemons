const Sequelize = require('sequelize');
const database = require('../config/db');

const Usuario = database.define('usuarios', {
  id_usuario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;
