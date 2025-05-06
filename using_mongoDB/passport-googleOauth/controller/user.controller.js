// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let passport = require("passport") ;

// controller code 

let getLogin = function(req,res){

    res.status(200).render("login") ;

} 

let getProfile = function(req,res){

    if(req.isAuthenticated())
    {
        res.status(200).render("profile") ;
    }
    else
    {
        res.status(200).render("login") ;
    }

}

let getLogout = function(req,res){

    try
    {
        req.logout(function(err){
            if(err)
            {
                return next(err) ;
            }
            else
            {
                res.status(200).redirect("/") ;
            }
        })
    }
    catch(error)
    {
        res.status(400).json({

            message : "Find error in logout" ,
            error : error.message

        }) ;
    }

}



// export codes 

module.exports = {

    getLogin ,
    getProfile ,
    getLogout

}
