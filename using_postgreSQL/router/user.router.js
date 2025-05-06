// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let express = require("express") ;
let userRoute = express.Router() ;

let passport = require("passport") ;

let { getLogin, postLogin, getRegister, postRegister, getProfile, getLogout } = require("../controller/user.controller");

//Routing Code : 

userRoute.get("/login" , getLogin) ;
// userRoute.post("/login" , postLogin) ;

userRoute.post('/login', 
    passport.authenticate('local',
        { 
            failureRedirect: '/login' ,
            successRedirect : "/profile"        
        }),
    function(req, res) {
        res.redirect('/');
    });

userRoute.get("/register" , getRegister) ;
userRoute.post("/register" , postRegister) ;

userRoute.get("/profile" , getProfile) ;

userRoute.get("/logout" , getLogout) ;

// Exports Code :

module.exports = userRoute ;
