"use strict";
console.clear();

// main code

// require all the modules, packages, objects
let express = require("express");
let userRoute = express.Router();

const { getSignup, postSignup, getLogin , getProfile } = require("../controller/user.controller");
const handleValidationResult = require("../validation/result.validation");
const { inputValidationRules } = require("../validation/rules.validation");

let passport = require("passport");

// connect with server

// routing code

userRoute.get("/signup", getSignup);
userRoute.post("/signup", inputValidationRules, handleValidationResult, postSignup);
userRoute.get("/login", getLogin);
userRoute.get("/profile", getProfile);

userRoute.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' , successRedirect:"/profile"}),
);

// export codes
module.exports = userRoute;
