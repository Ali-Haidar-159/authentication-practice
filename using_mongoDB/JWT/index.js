// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let app = require("./app") ;
let chalk = require("chalk") ;
require("dotenv").config() ;

// connect with server 

let portNumber = process.env.PORT || 5000 ;
let consoleDesign = chalk.bold.bgRed.italic ;

app.listen(portNumber , function(){

    console.log(consoleDesign(`Server is running at http://localhost:${portNumber}...`)) ;

}) ;



// export codes 