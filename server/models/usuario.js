const database = require('../config/db');
const Sequelize = require('sequelize');

const Usuario = database.define('usuarios', {
  id_usuario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: { type: Sequelize.INTEGER, allowNull: false },
  senha: { type: Sequelize.INTEGER, allowNull: false },
});
module.exports = Usuario;
