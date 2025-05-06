// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let app = express() ;

let morgan = require("morgan");
let cors = require("cors") ;
let ejs = require("ejs") ;
let path = require("path") ;
require("dotenv").config() ;

const userRoute = require("./router/user.router");

let passport = require("passport") ;
let session = require("express-session") ;
let mongoStore = require("connect-mongo") ;
require("./config/passport") ;

// connect with server 

app.use(morgan("dev")) ;
app.use(cors()) ;

app.set("view engine" , "ejs") ;
app.set("views" , path.join(__dirname , "view")) ;

app.set('trust proxy', 1) ;
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({

        mongoUrl : process.env.DB_URL ,
        collectionName : "sessions&cookies"

    })
}));

app.use(passport.initialize()) ;
app.use(passport.session()) ;

app.use(userRoute);

// request-response-cycle 

app.get("/" , function(req,res){

    res.status(200).render("home") ;

}) ;

// handle the route error 

app.use(function(req,res,next){

    res.status(404).json({

        status : 404 ,
        message : "page not found" ,

    });

});

// handle the server error 

app.use(function(err,req,res,next){

    res.status(500).json({

        status : 500 ,
        message : "Find Server Error" ,
        error : err.message 

    }) ; 

}) ;

// export codes 

module.exports = app ;
