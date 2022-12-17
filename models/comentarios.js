const Sequelize = require('sequelize');
const database = require('../config/db');

const Comentarios = database.define('comentarios', {
  id_comentario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  comentario: {
    type: Sequelize.BIGINT,
  },
  curtidas: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Comentarios;
