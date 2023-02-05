'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('respostas', {
      id_respostas: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_usuario: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id_usuario', 
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      id_comentario: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'comentarios',
          key: 'id_comentario', 
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      usuario: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      comentario: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('respostas');
  },
};
