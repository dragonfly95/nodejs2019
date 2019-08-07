/*
var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/



const fs = require('fs');

let routes = [];

fs.readdirSync(__dirname)
    .filter(file => file != 'index.js')
    .forEach(file => {
      routes = routes.concat(require(`./${file}`))
    });

module.exports = routes;
