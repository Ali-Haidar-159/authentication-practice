// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let {Pool} = require("pg") ;
require("dotenv").config() ;

//Configure The PostgreSQL : 

let connectionPool = new Pool({

    host : "localhost" ,
    user : process.env.DB_USER ,
    password : process.env.DB_PASSWORD ,
    port : 5432 ,
    database : "authentication"

})

// Exports Code :

module.exports = connectionPool ;
