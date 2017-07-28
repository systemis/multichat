var mysql = require('mysql');



module.exports = mysql.createConnection({
    connectionLimit: 100,
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'Chattogether',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})
