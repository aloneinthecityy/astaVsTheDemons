const Sequelize = require('sequelize');
const database = require('.././config/db');

const Salvar_estado = database.define('salvar_estado', {
  id_usuario: { type: Sequelize.INTEGER },
  slot_1: { type: Sequelize.JSON },
  slot_2: { type: Sequelize.JSON },
  slot_3: { type: Sequelize.JSON },
});

module.exports = Salvar_estado;

