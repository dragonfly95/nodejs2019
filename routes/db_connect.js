
var mysql = require("mysql");

module.exports = function() {
  return mysql.createConnection({
            user: 'root',
            password: '1q2w3e4r5t',
            database: 'restaurant'
        });
}();
