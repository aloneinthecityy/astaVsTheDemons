'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pontuacao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_enredo: {
        type: Sequelize.INTEGER,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
      },
      final_enredo: {
        type: Sequelize.STRING,
      },
      pontuacao: {
        type: Sequelize.INTEGER,
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
      fk_idEnredo: {
        // name of foreign key using naming convention
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: { tableName: 'enredos' }, // provide table name
          key: 'id_enredo', // PK of the User Model
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
    await queryInterface.dropTable('pontuacao');
  },
};
