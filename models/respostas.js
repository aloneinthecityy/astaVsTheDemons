const Sequelize = require('sequelize');
const database = require('../config/db');

const Respostas = database.define('respostas', {
  id_respostas: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_comentario: { type: Sequelize.INTEGER },
  comentario: { type: Sequelize.BIGINT },
});

module.exports = Respostas;
