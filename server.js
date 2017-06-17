'use strict';

var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var app        = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, ".", "build")));

app.get("/", (req, res) => {
    path.resolve(__dirname, ".", "public/index.html");
})

app.listen(9999 || process.env.PORT, () => {
    console.log('Co nguoi dang nhap');
})