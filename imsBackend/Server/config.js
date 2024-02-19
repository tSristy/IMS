const mySql = require("mysql");

const config =  mySql.createConnection({
        user: "root",
        password: "",
        database: "",
        multipleStatements: true,
    })
    
    
module.exports = config;