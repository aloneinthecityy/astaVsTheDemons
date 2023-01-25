const database = require('../database');
const Sequelize = require('sequelize');

const Respostas = database.define('respostas', {
  id_respostas: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // TODO: REVISAR com o ROGER se é melhor usar o id_comentario ou o id_usuario como chave estrangeira !!!
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
    allowNull: true,
  },
  comentario: {
    type: Sequelize.TEXT,
  },
});

module.exports = Respostas;
