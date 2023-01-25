const database = require('../database');
const Sequelize = require('sequelize');

const SalvarEstado = database.define(
  'salvar_estados',
  {
    id_estado: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    // todo estado deve pertencer a um usuário
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
    slot_1: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    slot_2: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    slot_3: {
      type: Sequelize.JSON,
      allowNull: true,
    },
  },
  {
    tableName: 'salvar_estados',
  }
);

module.exports = salvar_Estados;
