// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let app = express() ;

let cors = require("cors") ;
let morgan = require("morgan") ;
const userRoute = require("./router/user.router");

let passport = require("passport") ;
require("./config/passport_JWT") ;

require("./config/database") ;

// connect with server 

app.use(express.urlencoded({extended : true})) ;
app.use(express.json()) ;

app.use(cors()) ;
app.use(morgan("dev")) ;

app.use(passport.initialize()) ;

app.use(userRoute) ;

// request-response-cycle 

app.get("/" , function(req,res){
    
    res.status(200).send("This is HOME page") ;

}) ;

// handle the route error 

app.use(function(req,res,next){

    res.status(404).json({

        status : 404 ,
        message : "Page or Path not found"

    }) ;

}) ;

// handle the server error 

app.use(function(err,req,res,next){

    res.status(500).json({

        status : 500 ,
        message : "Find Server error" ,
        error : err.message

    });

});

// export codes  

module.exports = app  ;