// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let path = require("path") ;
let bcrypt = require("bcrypt") ;
require("dotenv").config() ;

let {userCollection} = require("../model/user.model")  ;

let passport = require("passport") ;

// controller code 

let getRegister = function(req,res){

    res.status(200).render("register") ;

} 

let postRegister = async function(req,res){

    try
    {

        let {username , password} = req.body ;

        let user = await userCollection.findOne({username:username}) ;

        if(user)
        {
            res.status(201).json({

                message : "User already exists" ,

            })
        }
        else
        {
            let saltRounds = 10 ;

            bcrypt.hash(password , saltRounds , async function(err,hash){

                let newUser = new userCollection({
                    username ,
                    password : hash
                }) ;
                await newUser.save() ;
    
                res.status(201).json({
    
                    success : true  ,
                    message : "User is created" ,
                    newUser
    
                }) ;

            })
        }

    }
    catch(error)
    {
        res.status(402).json({

            message : "Register error" ,
            error : error.message 

        })
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

// exports code 

module.exports = {

    getRegister ,
    postRegister , 
    getLogin ,
    getProfile ,
    getLogout
}