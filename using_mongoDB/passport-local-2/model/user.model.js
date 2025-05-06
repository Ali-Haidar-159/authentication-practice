// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let mongoose = require("mongoose") ;
require("dotenv").config() ;
let chalk = require("chalk") ;

// connect with server 

let DB_URL = process.env.DB_URL ;

async function connectDB ()
{

    try
    {
        await mongoose.connect(DB_URL) ;
        console.log(chalk.bgGreen("Database is connected.")) ;

    }
    catch(error)
    {
        console.log({

            message : "Error found when we connect to Database" ,
            error : error.message 

        }) ;
        process.exit(1) ;
    }
    
}

// creating schema 

let userSchema = new mongoose.Schema({

    username : {
        type : String ,
        required : true
    } ,

    password : {
        type : String ,
        required : true
    }

}) ;

// creating collection 

let userCollection = mongoose.model("UserCollection" , userSchema) ;


// export codes 

module.exports = {

    connectDB ,
    userCollection ,

}