
const Sequelize = require('sequelize');

const connection = new Sequelize('my-db','root','',{dialect: 'mysql', operatorsAliases: false});

module.exports = connection