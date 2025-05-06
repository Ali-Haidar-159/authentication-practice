// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let express = require("express") ;
let app = express() ;

let http = require("http") ;
let path = require("path") ;
let morgan = require("morgan") ;
let cors = require("cors") ;

const userRoute = require("./router/user.router");

let passport = require("passport") ;
let session = require("express-session") ;
require("./config/passport.config") ;

//Creating Server : 

let myServer = http.createServer(app) ;

// Connect With Server : 

app.set("view engine" , "ejs") ;
app.set("views" , path.join(__dirname , "view")) ;

app.use(express.urlencoded({extended:true})) ;
app.use(express.json()) ;

app.use(morgan("dev")) ;
app.use(cors()) ;

// passport code 

app.set("trust proxy" , 1) ;
app.use(session({
    secret : "keyboard cat" ,
    resave : false ,
    saveUninitialized : true 
}));

app.use(passport.initialize()) ;
app.use(passport.session()) ;

app.use(userRoute) ;

// Request-Response-Cycle : 

app.get("/" , function(req,res){
    res.status(200).render("home") ;
}) ;

// Handle The Route Error 

app.use(function(req,res,next){

    res.status(404).json({

        status : 404 ,
        message : "Page not found !!!"

    });

});

// Handle The Server Error 

app.use(function(err,req,res,next){

    res.status(500).json({

        status : 500 ,
        message : "Find the server error !!!" ,
        error : err.message

    });

});

// Exports Code :

module.exports = myServer ;
