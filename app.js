var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var playlistRouer = require('./routes/playlist');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'itaewon class',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
}));

app.use(passport.initialize());
app.use(passport.session());

const authMiddleWare = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    }else {
        res.redirect(302, '/login');
    }
}

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/', authRouter);
app.use('/api/v1/playlist', playlistRouer);
module.exports = app;
