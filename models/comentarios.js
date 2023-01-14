const Sequelize = require('sequelize');
const database = require('../config/db');

const Comentarios = database.define('comentarios', {
  id_comentario: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id_usuario',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false,
  },
  nm_user: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  comentario: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  curtidas: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

module.exports = Comentarios;
