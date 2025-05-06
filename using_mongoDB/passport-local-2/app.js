// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let app = express() ;

let morgan = require("morgan") ;
let path = require("path") ;
let cors = require("cors") ;
let bcrypt = require("bcrypt") ;
require("dotenv").config() ;
require("./config/passport") ;

let {userCollection} = require("./model/user.model")  ;

let passport = require("passport") ;
let session = require("express-session") ;
let mongoStore = require('connect-mongo');
const userRoute = require("./router/user.router");

// connect with server 

app.use(express.urlencoded({extended:true})) ;
app.use(express.json()) ;

app.set("view engine" , "ejs") ;
app.set("views" , path.join(__dirname , "view")) ;

app.use(morgan("dev")) ;
app.use(cors()) ;


// passport code 

app.set('trust proxy', 1) 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl : process.env.DB_URL ,
        collectionName : "session&cookie"
    })

})) ;

app.use(passport.initialize()) ;
app.use(passport.session()) ;


app.use(userRoute) ;

// request-response-cycle 

app.get("/" , function(req,res){

    res.status(200).render("home") ;

}) ;



// handle the route and server error 

app.use(function(req,res,next){

    res.status(404).json({

        status : 404 ,
        message : "Page not found" ,
        error : "Route error"

    }) ;

}) ;

app.use(function(err,req,res,next){

    res.status(500).json({

        status : 500 ,
        message : "Server error found" ,
        error :err.message

    }) ;

}) ;

// export codes 

module.exports = app ;
