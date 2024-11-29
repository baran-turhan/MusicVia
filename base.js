const {Client} = require('pg')

const client = new Client({
    host:"localhost",
    user: "postgres",
    port: 5432,
    password: "mypassword",
    database: "chinook",
})

module.exports = client;



