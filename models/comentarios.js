const Sequelize = require('sequelize');
const database = require('../config/db');

const Comentarios = database.define('comentarios', {
  id_comentario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user: {
    type: Sequelize.STRING, 
    allowNull: true
  },
  comentario: {
    type: Sequelize.STRING, allowNull: false
  },
  curtidas: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Comentarios;
