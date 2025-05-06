// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let passport = require("passport") ;
let {userCollection} = require("../model/user.model") ;
require("dotenv").config() ;

let GoogleStrategy = require('passport-google-oauth20').Strategy;

// configure the passport-google-auth 

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.callbackURL
},
async function(accessToken, refreshToken, profile, cb) 
{
    try
    {
        let user = await userCollection.findOne({googleId : profile.id}) ;

        if(!user)
        {
            let newUser = new userCollection({
                googleId : profile.id , 
                username : profile.displayName 
            }) ;

            await newUser.save() ;

            return cb(null,newUser) ;
        }
        else
        {
            return cb(null,user) ;
        }
    }
    catch(error)
    {
        return cb(error,null) ;
    }
}

));

passport.serializeUser(function(user,done){
    done(null,user.id) ;
}) ;

passport.deserializeUser(async function(id,done){

    try
    {
        let user = await userCollection.findById(id) ;
        done(null,user) ;
    }
    catch(error)
    {
        done(error,false) ;
    }

});



// export codes 


