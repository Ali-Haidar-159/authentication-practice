// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let ev = require("express-validator") ;

// connect with server 

// validation rules setup 

exports.inputValidationRules = [

    ev.check("email").trim().notEmpty().withMessage("Email is empty").isEmail().withMessage("Invalid email") ,
    ev.check("password").trim().notEmpty().withMessage("Password is empty").isLength({min:5 , max:25}).withMessage("Password length should be between 5 and 25 characters") 

]

// export codes 