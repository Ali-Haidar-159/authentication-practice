// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

require("dotenv").config() ;


let dev = {

    port : {

        portNumber : process.env.PORT

    } ,

    db_url : {

        url : process.env.DB_URL

    }  
}

// export codes 

module.exports = dev ;