const { Sequelize } = require('sequelize');

const config = new Sequelize('ims-project', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = config;
