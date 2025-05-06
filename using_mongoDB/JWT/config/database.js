// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let mongoose = require("mongoose") ;
let chalk = require("chalk") ;
require("dotenv").config() ;

// connect with server 

let mongoURL = process.env.DB_URL ;

mongoose.connect(mongoURL)
.then(function(r){

    console.log(chalk.bgGreen("Database is connected")) ;

})
.catch(function(err){

    console.log({

        message : "Find error while connecting database" ,
        error : err.message 

    }) ;

    process.exit(1) ;

}) ;

// export codes 