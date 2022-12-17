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
      id_comentario: {
        type: Sequelize.INTEGER,
      },
      comentario: {
        type: Sequelize.STRING,
      },
      fk_idComentario: {
        // name of foreign key using naming convention
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: { tableName: 'comentarios' }, // provide table name
          key: 'id_comentario', // PK of the User Model
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
    await queryInterface.dropTable('respostas');
  },
};
