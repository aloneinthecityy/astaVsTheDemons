const database = require('../database')
const Sequelize = require('sequelize');

const Comentarios = database.define('comentarios', {
  id_comentario: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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
});

module.exports = Comentarios;
