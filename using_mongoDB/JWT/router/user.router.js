// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let express = require("express") ;
let userRoute = express.Router() ;

let passport = require("passport") ;

let userController = require("../controller/user.controller") ;

// routing code 

userRoute.post("/register" , userController.postRegister) ;
userRoute.post("/login" , userController.postLogin) ;

userRoute.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.status(200).json({

            message : "My Profile : POST" ,
            username : req.user.username 

        })
    }
);

// export codes 

module.exports = userRoute ;