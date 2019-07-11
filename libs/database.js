const mysql = require('mysql');
const co = require('co-mysql');
const {DB_NAME, DB_PORT, DB_USE, DB_PASS, DB_HOST} = require('../config');

let conn = mysql.createPool({
    host: DB_HOST,
    user: DB_USE,
    database: DB_NAME,
    password: DB_PASS,
    port: DB_PORT
});

module.exports = co(conn);