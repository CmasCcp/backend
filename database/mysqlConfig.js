const {createPool} = require('mysql2/promise');

const dbConnection = createPool({
        port: process.env.DB_PORT || 3306,
        host: process.env.HOST || "localhost",
        user: process.env.USER || "root",
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    })


module.exports = {
    dbConnection
}