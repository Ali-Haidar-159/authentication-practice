// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let ev = require("express-validator") ;

// connect with server 

// handle the validation result 

let handleValidationResult = function(req,res,next){

    let err = ev.validationResult(req) ;

    if(err.isEmpty())
    {
        next() ;
    }
    else
    {
        return res.status(401).json({

            status : 401 ,
            errors : err.array() 

        })
    }

}

// export codes 

module.exports = handleValidationResult ;
