var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const logger = require('./logger');

var bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
  resave: false,
  saveUninitialized: true
}));

app.use(morgan('combined', {stream: logger.stream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function middleLog(req, res, next) {
  console.log('middle log');
  next();
}
app.use(middleLog);
app.use('/', indexRouter);
app.use('/users', usersRouter);



/**
 * https://hyc7575.github.io/2017/06/02/2017-06-02-Nodejs-session-with-login/
 * https://hyc7575.github.io/2017/06/02/2017-06-02-Nodejs-session-with-login2/
 * https://hyc7575.github.io/2017/06/03/2017-06-03-NodeJs-session-with-login3/
 */

const users = [
  {
      user_id: 'admin',
      user_nickname: '혁',
      // user_pwd: '123456'
      user_pwd: "$2a$10$Rq.T0yV3G3flg7prq5nPAuY32geCevDacaBD8ZNcbAnp9/On5i1pa"
  },
  {
      user_id: 'root',
      user_nickname: '에이치',
      user_pwd: '1q2w3e'
  }
]


const findUser = (user_id, user_pwd) => {
  // id와 password가 일치하는 유저 찾는 함수, 없으면 undefined 반환
  // return users.find( v => (v.user_id === user_id && v.user_pwd === user_pwd) );
  return users.find( v => (v.user_id === user_id && bcrypt.compareSync(v.user_pwd, user_pwd)) );
}
const findUserIndex = (user_id, user_pwd) => {
  // 일치하는 유저의 index값(유니크) 반환
  // return users.findIndex( v => (v.user_id === v.user_pwd === user_pwd) );
  return users.findIndex( v => (v.user_id === user_id && bcrypt.compareSync(v.user_pwd, user_pwd)) );
}


app.get('/login', (req, res) => {
  const sess = req.session;
  if(sess.user_uid === undefined) {
    res.render('login',{title:'login'});
  } else {
    res.redirect('/');
  }
});

app.post('/login', (req, res) => {
  const body = req.body;


  if(findUser( body.user_id, body.user_pwd )) {
    req.session.user_uid = findUserIndex( body.user_id, body.user_pwd );
     res.redirect('/');
  } else {
    res.end('유효하지 않습니다');
  }
});

app.get('/logout', (req, res) => {
  delete req.session.user_uid;
   res.redirect('/');
})
//---------------------------------------------


app.get('/join', (req, res) => {
  res.render('join');
});

app.post('/join', (req, res) => {
  const body = req.body;
  if(body.user_id != 'admin') {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.user_pwd, salt);

    users.push({
      user_id: body.user_id,
      user_pwd: hash,
      user_nickname: body.user_nickname
    });
    res.redirect('/login');
  } else {
    res.send('이미 존재함');
  }
})

var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var upload = multer({ dest: 'uploads/' })

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    var ext = "png";
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      ext = "jpg";
    }
    cb(null, file.originalname+"."+ext);
  }
});
var upload = multer({ storage: storage});


app.use('/uploads', express.static('uploads'));

app.get('/upload', (req, res) => {
  res.render('upload', { title: 'file upload' });
});

app.post('/upload', upload.single('file1'), (req, res) => {
  res.send('Uploaded! : '+req.file); // object를 리턴함
  console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
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
  console.error(err.stack);
  res.render('error');
});

module.exports = app;
