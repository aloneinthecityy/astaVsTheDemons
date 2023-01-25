'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salvar_estados', {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('salvar_estados');
  },
};
