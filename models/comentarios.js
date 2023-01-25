const database = require('../database')
const Sequelize = require('sequelize');

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
    references: {
      model: 'usuarios',
      key: 'id_usuario',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  usuario: {
    type: Sequelize.STRING, 
    allowNull: true
  },
  comentario: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  curtidas: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Comentarios;
