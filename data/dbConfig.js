var sql = require('mysql');

var config = sql.createPool({
    user: 'root',
    password: '',
    host: 'localhost', 
    database: 'VidoThuvien',
    trustServerCertificate: true
});

module.exports = config