const database = require('../database');
const Sequelize = require('sequelize');

const Respostas = database.define('respostas', {
  id_respostas: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id_usuario',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  id_comentario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'comentarios',
      key: 'id_comentario',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  usuario: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  comentario: {
    type: Sequelize.TEXT,
  },
});

module.exports = Respostas;
