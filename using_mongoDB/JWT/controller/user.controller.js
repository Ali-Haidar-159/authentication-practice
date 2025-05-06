// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let userCollection = require("../model/user.model") ;
let bcrypt = require("bcrypt") ;
require("dotenv").config() ;

let jwt = require('jsonwebtoken'); //for creating access token

// controller code 

let postRegister = async function(req,res){

    try
    {

        let {username,password} = req.body ;

        let user = await userCollection.findOne({username : username}) ;

        if(user)
        {
            res.status(300).json({

                status : 300 ,
                message : "User already exists !!!"

            }) ;
        }
        else
        {
            let saltRounds = 10 ;

            bcrypt.hash(password,saltRounds,function(err,hash){

                let newUser = new userCollection({

                    username ,
                    password : hash

                }) ;

                newUser.save().then(function(r){

                    res.status(201).json({

                        success : true ,
                        message : "New User Is Created" ,
                        newUser 

                    }) ;

                });

            });
        }

    }
    catch(err)
    {
        res.status(400).json({

            status : 400 ,
            message : "Find error while creating new user" ,
            error : err.message

        })
    }

}

let postLogin = async function(req,res){

    try
    {

        let {username,password} = req.body ;

        let user = await userCollection.findOne({username : username}) ;

        if(user)
        {
            bcrypt.compare(password,user.password , function(err,result){

                if(result === true)
                {

                    let payload = {

                        username : user.username ,
                        id : user._id 
                    }

                    let SECRET_KEY = process.env.SECRET_KEY ;

                    let token = jwt.sign(payload, SECRET_KEY , {expiresIn:"2D"})

                    res.status(200).json({

                        success : true ,
                        message : "Login Successful" ,
                        token : "Bearer " + token

                    }) ;
                }
                else
                {
                    res.status(200).json({

                        success : false ,
                        message : "incorrect username or password" 

                    });
                }

            });
        }
        else
        {
            res.status(402).json({

                success : false ,
                message : "User not found" 

            })
        }

    }
    catch(err)
    {
        res.status(400).json({

            message : "Find error while log in" ,
            error : err.message

        })
    }

}

// let getProfile = function(req,res){

//     res.status(200).send("PROFILE PROFILE PROFILE") ;

// }

// export codes 

module.exports = {

    postRegister ,
    postLogin ,
    // getProfile

}