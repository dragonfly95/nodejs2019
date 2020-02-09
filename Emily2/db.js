const mysql = require("mysql");
const config = require("./config");
const logger = require('./logger');

const pool = mysql.createPool(config);
logger.info('Connection pool created.');

pool.on('acquire', function (connection) {
  logger.info(`Connection ${connection.threadId} acquired`);
});

pool.on('enqueue', function () {
  logger.info('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  logger.info(`Connection ${connection.threadId} released`);
});

const getConn = function(callback) {
  pool.getConnection(function(err, connection) {
    callback(err, connection);
  });
}



function makeQuery(sql, param, callback) {
  db((err,connection) => {
    connection.query(sql, param, (err, rows) => {
      connection.release(); // 연결세션 반환.
      if (err) throw err;
      callback(rows); // 결과는 rows에 담아 전송
    });
  });
}


module.exports = getConn;