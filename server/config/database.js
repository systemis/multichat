var mysql = require('mysql');

module.exports = mysql.createConnection({
    connectionLimit: 100,
    host: '',
    port: 3306,
    user: '',
    password: '',
    database: '',
})
