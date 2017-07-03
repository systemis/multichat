var mysql = require('mysql');

module.exports = mysql.createConnection({
    connectionLimit: 100,
    host: '',
    port: 3306,
    user: '',
    password: '',
    database: '',
    // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})
