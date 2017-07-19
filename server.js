'use strict';

var onlineUsers = [];

const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
const morgan         = require('morgan');
const cookieParser   = require('cookie-parser');
const expresssession = require('express-session');
const app            = express();
const server         = require('http').Server(app);
const userDm         = require('./server/model/database-user.js');
const roomDm         = require('./server/model/database-room');
const ss             = require('./server/socket/socket-manager.js'); // Custom chat 


app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(cookieParser());
app.use(expresssession( {
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true
} ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("build"));

require('./server/app/auth.js')(server, app, onlineUsers);
require('./server/app/user.js')(app, onlineUsers);
require('./server/app/chat.js')(app);

// setup pages router
require('./server/router.js')(app);

new ss(server, onlineUsers);

server.listen(process.env.PORT || 9999, () => {
    // userDm.dropTable((err, result) => {})
    // roomDm.dropTable((err, result) => {})
});
