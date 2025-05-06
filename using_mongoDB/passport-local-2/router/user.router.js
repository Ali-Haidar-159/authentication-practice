// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let userRoute = express.Router() ;
const { getRegister, postRegister, getLogin, getProfile, getLogout } = require("../controller/user.controller");
let passport = require("passport") ;

// routing code 

userRoute.get("/register" , getRegister) ;
userRoute.post("/register" , postRegister) ;
userRoute.get("/login" , getLogin) ;

userRoute.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login'  , successRedirect : '/profile'}),
);

userRoute.get("/profile" , getProfile) ;
userRoute.get("/logout" , getLogout) ;

// exports code 

module.exports = userRoute ;

