// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let mongoose = require("mongoose") ;
let dev = require("../config/config") ;

// connect with server 

let mongoURL = dev.db_url.url ;

async function connectDB ()
{
    try
    {

        await mongoose.connect(mongoURL) ;
        console.log("Database is connected") ;

    }
    catch(error)
    {
        console.log({

            message : "Database is not connected" ,
            error : error.message 

        });
        process.exit(1) ;

    }
}

// creating schema 

let userSchema = new mongoose.Schema({

    email : {
        type : String ,
        required : {
            value : true ,
            message : "Email should be required" 
        }
    } ,

    password : {
        type : String ,
        required : [true , "password should be required"]
    } ,

    createdAt : {

        type : Date ,
        default : Date.now

    }

}) ;

// creating collection 

let userCollection = mongoose.model("UsersData" , userSchema) ;

// export codes 

module.exports = {

    connectDB ,
    userCollection ,

} ;