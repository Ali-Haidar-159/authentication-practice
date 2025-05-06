// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let app = require("./app") ;
const { connectDB } = require("./model/user.model");

let chalk = require("chalk") ;
require("dotenv").config() ;

// connect with server 

let portNumber = process.env.PORT || 5000 ;

app.listen(portNumber ,async function(){

    console.log(chalk.bgRed.bold.italic(`Server is running at http://localhost:${portNumber}...`)) ;
    await connectDB() ;

});

// export codes 