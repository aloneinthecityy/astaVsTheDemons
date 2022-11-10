const Sequelize = require('sequelize');
const sequelize = new Sequelize('astavsthedemons', 'postgres', 'admin', {
    host: 'localhost',
    dialect:  'postgres'
  });

module.exports = sequelize;