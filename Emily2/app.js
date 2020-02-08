var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require("./db");
var bodyParser = require('body-parser');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/bbs', (req, res) => {
  // Get Connection in Pool
  db((err,connection) => {
      connection.query("select * from tbl_menu", (err, rows) => {
        connection.release(); // 연결세션 반환.
        if (err) throw err;
        return res.json({ data: rows }); // 결과는 rows에 담아 전송
      });
  });
});
app.post('/bbs', (req, res) => {

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


app.post('/bbs2', (req, res) => {
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


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
