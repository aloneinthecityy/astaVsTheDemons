const Sequelize = require('sequelize');
const database = require('../config/db');

const Respostas = database.define('respostas', {
  id_respostas: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_comentario: {
    type: Sequelize.INTEGER,
  },
  user: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  comentario: {
    type: Sequelize.BIGINT,
  },
});

module.exports = Respostas;
