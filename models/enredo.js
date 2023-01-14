const Sequelize = require('sequelize');
const database = require('../config/db');

const Enredo = database.define('enredo', {
  id_enredo: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome_enredo: {
    type: DataTypes.STRING,
  },
});

module.exports = Enredo;
