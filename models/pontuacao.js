const Sequelize = require('sequelize');
const database = require('../config/db');

const Pontuacao = database.define('pontuacao', {
  id_enredo: {
    type: Sequelize.INTEGER,
  },
  id_usuario: {
    type: Sequelize.INTEGER,
  },
  final_enredo: {
    type: Sequelize.STRING,
  },
  pontuacao: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Pontuacao;
