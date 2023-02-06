const database = require('../database');
const Sequelize = require('sequelize');

const Respostas = database.define('respostas', {
  usuario: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  comentario: {
    type: Sequelize.TEXT,
  },
});

module.exports = Respostas;
