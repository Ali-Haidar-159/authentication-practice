// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let app = require("./app") ;
let dev = require("./config/config") ;
let chalk = require("chalk") ;
const { connectDB } = require("./model/user.model");

// connect with server 

let port = dev.port.portNumber || 5000 ;
let consoleDesign = chalk.bold.bgGreen.italic ;

app.listen(port ,async function(){

    console.log(consoleDesign(`Server is running at http://localhost:${port}`)) ;

    await connectDB() ;
    
});

// export codes 