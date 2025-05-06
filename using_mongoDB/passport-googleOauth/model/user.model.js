// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let mongoose = require("mongoose") ;
require("dotenv").config() ;
let chalk = require("chalk") ;

// connect with server 

async function connectDB ()
{
    try
    {
        let DB_URL = process.env.DB_URL ;

        await mongoose.connect(DB_URL) ;

        console.log(chalk.bgGreen("Database is connected")) ;

    }
    catch(error)
    {
        console.log({

            message : "Find error when Database wants to connect with server." ,
            error : error.message
            
        })
    }
}

// creating schema 

let userSchema = new mongoose.Schema({

    username : {
        type : String ,
        required : true 
    } ,
    googleId : {
        type : String ,
        required : true 
    }

});

// creating collection/model 

let userCollection = mongoose.model("userCollection" , userSchema) ;


// export codes 

module.exports = {

    connectDB ,
    userCollection 

}