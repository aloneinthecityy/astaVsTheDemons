const database = require('../config/db');
const Sequelize = require('sequelize');

const Salvar_estado = database.define('salvar_estado', {
  id_usuario: { type: Sequelize.INTEGER },
  slot_1: { type: Sequelize.INTEGER },
  slot_2: { type: Sequelize.INTEGER },
  slot_3: { type: Sequelize.INTEGER },
});
module.exports = Salvar_estado;
