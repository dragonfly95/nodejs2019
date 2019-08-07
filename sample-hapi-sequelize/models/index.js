/*
const fs = require('fs');

let routes = [];

fs.readdirSync(__dirname)
    .filter(file => file != 'index.js')
    .forEach(file => {
        routes = routes.concat(require(`./${file}`))
    });

module.exports = routes;
*/


/* sequelize\models\index.js */
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(
    path.join(__dirname + '/..', 'config', 'config.json')
)[env];
const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Person = require('./person')(sequelize, Sequelize);

module.exports = db;
