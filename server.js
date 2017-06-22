'use strict';

var express       = require('express');
var path          = require('path');
var bodyParser    = require('body-parser');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var expresssession= require('express-session');
var app           = express();

// var userDm        = require('./server/model/database-user.js');

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(cookieParser());
app.use(expresssession( {
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true
} ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("build"));

// setup pages router
require('./server/app/login.js')(app);
require('./server/app/user.js')(app);
require('./server/router.js')(app);

app.listen(3000 || process.env.PORT, () => {
    console.log('Co nguoi dang nhap');
    // userDm.dropTable(rs => console.log(rs));
})