// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let app = require("./app") ;
let chalk = require("chalk") ;
require("dotenv").config() ;

const { connectDB } = require("./model/user.model");

// connect with server 

let portNumber = process.env.PORT  || 5000 ;
let consoleDesign1 = chalk.bold.italic.bgRed ;

app.listen(portNumber ,async function(){

    console.log(consoleDesign1(`Server is running at http://localhost:${portNumber}...`)) ;

    await connectDB() ;

});


// export codes 