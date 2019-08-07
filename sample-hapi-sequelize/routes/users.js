var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../config/db.js');
var connection = mysql.createConnection(dbconfig)





// connection.connect();

/* GET users listing. */
router.get('/', (req, res, next) => {
  connection.query('select userid, userpw from user', (err, result) => {
      if(err) res.send('err: ' + err);
      else {
        res.render('users/list',{'title':'userList', 'users': result});
        // res.send(result);
      }
    })
  // res.send('respond with a resource - dbdyd');
});


router.post('/', (req, res, next) => {
  var userid = req.body.userid;
  var userpw = req.body.userpw;
console.log(req.body)

  if(userid && userpw) {
    /*
    // insert into user (userid, userpw) values (?,?)
    connection.query("insert into user set ?", req.body , (err, result, fields) => {
          if(err) res.send('err: ' + err);
          else
            res.send('success create');
        })
    */
    connection.query("insert into user (userid, userpw) values (?, ?)", [userid, userpw] , (err, result, fields) => {
      if(err) res.send('err: ' + err);
      else
        res.send('success create');
    })  

  }
})




router.get('/:userid', (req, res) => {
  var userid = req.params.userid;
  connection.query('select userid, userpw from user where userid=?',userid, (err, result) => {
    if(err) res.send('err::' + err);
    res.send(result[0]);
  })
})

router.put('/:userid', (req, res) => {
  // update user set userpw=#{userpw} where userid=#{userid}
  connection.query('update user set ? where userid=?', [req.body, req.body.userid], (err, result) => {
    if(err) res.send('error:: ' + err);
    res.send({'result':'ok'});
  })
})
module.exports = router;
