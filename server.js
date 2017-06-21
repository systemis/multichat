'use strict';

var express       = require('express');
var path          = require('path');
var bodyParser    = require('body-parser');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var expresssesion = require('express-session');
var userDm        = require('./server/model/database-user.js');
var app           = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(cookieParser());
app.use(expresssesion({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, ".", "build")));

// setup pages router
require('./server/router.js')(app);
require('./server/app/login.js')(app);

app.listen(9999 || process.env.PORT, () => {
    console.log('Co nguoi dang nhap');
    const bundle = {
        name : 'test',
        email: 'systemofpet',
        password: 'Hi'
    }

    userDm.newUser(bundle, (err, result) => console.log(result));
})