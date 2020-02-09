var express = require('express');
var router = express.Router();
const db = require("../db");
const winston = require('../logger');
const { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/menus', (req, res) => {
  const sess = req.session;
  // Get Connection in Pool
  makeQuery("select * from tbl_menu", null, (obj) => {
    return res.json({data:obj});
  });
});

router.get('/menus/:menuId', (req, res) => {
  makeQuery('select * from tbl_menu where menu_id=?',[req.params.menuId], (obj) => {
    winston.debug( req.params.menuId);
    return res.json({data:obj[0]});
  });
});

router.post('/menus', [
  check('menu_price').isInt(),
  check('cooking_time').isInt(),
],(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  var sql = 'insert into tbl_menu (menu_name, menu_price, cooking_time) values (?,?,?)';
  var param = [req.body.menu_name,req.body.menu_price,req.body.cooking_time];
  db((err, connection) => {
    connection.query(sql,param, (err, rows, fields) => {
      connection.release();
      if(err) throw err;
      console.log(rows.insertId);
      return res.json({ 'message': 'ok' });
    })
  });
});

router.put('/menus/:menuId', (req, res) => {
  db((err, connection) => {

    var param = [req.body.menu_name, req.body.menu_price,req.body.cooking_time, req.body.menu_id];
    connection.query('update tbl_menu set menu_name=?, menu_price=?, cooking_time=? where menu_id=?',param, (err, rows,fields) => {
      connection.release();
      if(err) throw err;
      return res.json({ data: rows[0]});
    })
  })
});

router.delete('/menus/:menuId', (req, res) => {
  db((err, connection) => {

    var param = [ req.params.menuId];
    connection.query('delete from tbl_menu where menu_id=?',param, (err, rows,fields) => {
      connection.release();
      if(err) throw err;
      return res.json({ data: rows[0]});
    })
  })
});

router.post('/bbs2', (req, res) => {
  var sql = 'insert into tbl_menu set ?';
  var param  = req.body;

  db((err, connection) => {
    connection.query(sql, param, (err, rows, fields) => {
      connection.release();
      if(err) {
        return res.json({ 'message': 'error' });
        throw err;
      }
      console.log(rows.insertId);
      return res.json({ 'message': 'ok' });
    })
  });
});



function makeQuery(sql, param, callback) {
  db((err,connection) => {
    connection.query(sql, param, (err, rows) => {
      connection.release(); // 연결세션 반환.
      if (err) throw err;
      callback(rows); // 결과는 rows에 담아 전송
    });
  });
}


module.exports = router;
