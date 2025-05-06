// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let mongoose = require("mongoose") ;

// creating the schema 

let userSchema = new mongoose.Schema({

    username : {
        type : String ,
        required : [true , {message : "username should be required"}] ,
    } ,
    password : {
        type : String ,
        required : {
            value : true ,
            message : "password should be required"
        }
    } ,
    createdAt : {
        type : Date ,
        default : Date.now,
    }

}) ;

// creating collection or table 

let userCollection = mongoose.model("userCollection" , userSchema) ;


// export codes 

module.exports = userCollection ;