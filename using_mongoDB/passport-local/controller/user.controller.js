// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let {userCollection} = require("../model/user.model") ;
let bcrypt = require("bcrypt") ;
let dev = require("../config/config") ;
let passport = require("passport") ;

// controller code 

let getSignup = function(req,res){

    res.status(200).render("signup") ;

}

let postSignup = async function(req,res){

    let {email,password} = req.body ;

    let saltRounds = 10 ;

    try
    {
        await bcrypt.hash(password,saltRounds ,async function(err,hash){

            let newUser = new userCollection({
                email,
                password : hash
            });
    
            await newUser.save() ;


            res.status(200).json({

                success : true ,
                message : "new user created" ,
                newUser

            })
    
        })    ; 
    }
    catch(error)
    {   

        res.status(200).json({

            success : false ,
            error : error.message 
        }) ;

    }

}

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
        res.redirect("/login") ;
    }

}

// export codes 

module.exports = {

    getSignup ,
    postSignup ,
    getLogin ,
    getProfile ,

}