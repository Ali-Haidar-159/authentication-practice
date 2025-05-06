// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let userRoute = express.Router() ;

let passport = require("passport") ;

const { getLogin, getProfile, getLogout } = require("../controller/user.controller");

// connect with server 

userRoute.get("/login" , getLogin) ;
userRoute.get("/profile" , getProfile) ;
userRoute.get("/logout" , getLogout) ;

userRoute.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

userRoute.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' ,successRedirect:"/profile" } ),
);


// export codes 

module.exports = userRoute ;
