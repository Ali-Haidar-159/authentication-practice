// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let myServer = require("./app") ;

let chalk = require("chalk") ;
require("dotenv").config() ;

// Connect With Server : 

let PORT = process.env.PORT || 5000 ;
let consoleDesign = chalk.bold.italic.bgRed ;

myServer.listen(PORT , function(){

    console.log(consoleDesign(`Server is running at http://localhost:${PORT}`)) ;

});


// Exports Code :


