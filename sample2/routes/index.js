
/*
 * GET home page.
 */

var client = require('./db_connect');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.createForm = function(req, res) {
  res.render('create');
}

exports.create = function(req, res) {
  var body = req.body;
  client.query('insert into tbl_menu(menu_name,menu_price,cooking_time) values (?,?,11)',[
    body.menu_name, parseInt(body.menu_price)
  ], function() {
    res.redirect('list')
  })
}


exports.list = function(req, res) {
  client.query('select * from tbl_menu', function(err, result, fields) {
    if(err) console.log('쿼리문에 오류가 있습니다.');
    res.json(result);
  });
}
