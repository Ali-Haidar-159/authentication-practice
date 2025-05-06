// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let path = require("path") ;
let bcrypt = require("bcrypt") ;
let connectionPool = require("../config/database.config") ;
let passport = require("passport") ;

//Controller Code : 

let getLogin = function(req,res){

    res.status(200).render("login") ;

}

let postLogin = function(req,res){

    res.status(200).send("POST : login") ;

}

let getRegister = function(req,res){

    res.status(200).render("register") ;

}

let postRegister = function(req,res){

    try
    {
        let {username,password} = req.body ;

        let saltRounds = 10 ;

        bcrypt.hash(password , saltRounds , async function(err,hash){

            let newUser = await connectionPool.query("INSERT INTO user_details(username,password) VALUES($1 , $2) RETURNING * " , [username,hash]) ;

            res.status(201).json({

                success : true ,
                data : newUser.rows 

            }) ;

        })

    }
    catch(error)
    {
        res.status(400).json({

            message : "Find error to post data on register !!!" ,
            error : error 

        })
    }    

}

let getProfile = function(req,res){

    if(req.isAuthenticated())
    {
        res.render("profile") ;
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
                return nextTick(err)
            }
            else
            {
                res.redirect("/") ;
            }

        })

    }
    catch(error)
    {
        res.status(400).send("Logout Failed") ;
    }

}

// Exports Code :

module.exports = {

    getLogin ,
    postLogin ,
    getRegister ,
    postRegister ,
    getProfile ,
    getLogout,

}
