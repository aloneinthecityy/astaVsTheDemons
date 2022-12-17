'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salvar_estados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
      },
      slot_1: {
        type: Sequelize.JSON,
      },
      slot_2: {
        type: Sequelize.JSON,
      },
      slot_3: {
        type: Sequelize.JSON,
      },
      fk_idUsuario: {
        // name of foreign key using naming convention
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: { tableName: 'usuarios' }, // provide table name
          key: 'id_usuario', // PK of the User Model
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('salvar_estados');
  },
};
