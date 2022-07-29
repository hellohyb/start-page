
const mysql = require('mysql');
//获取连接
const conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'123456789h',
    database:'notes',
    multipleStatements:true
});
conn.connect();
module.exports = conn;