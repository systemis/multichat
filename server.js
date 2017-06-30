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
const socketMG       = new ss(server, onlineUsers);


app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(cookieParser());
app.use(expresssession( {
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true
} ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("build"));


socketMG.mainHandler();

require('./server/app/auth.js')(server, app, onlineUsers);
require('./server/app/chat.js')(app);
require('./server/app/user.js')(app, onlineUsers);

// setup pages router
require('./server/router.js')(app);

server.listen(3000, () => {
    // userDm.dropTable((err, result) => {})
    // roomDm.dropTable((err, result) => {})


        // var dm  = ['dd', 'de'] ;
        // var dm2 = dm.filter((value) => {
        //     return value !== 'de';
        // })

        // console.log(dm2.join(''));
        const t1 = "2017-6-30 20:38:07";
        const t2 = "2017-6-30 20:38:18";
        // console.log(Date.parse("30-6-2017 20:45:16") > Date.parse("30-6-2017 20:42:20"))
        console.log(new Date().toLocaleString())
});
