// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let passport = require("passport") ;
let LocalStrategy = require("passport-local").Strategy ;
let {userCollection} = require("../model/user.model")  ;
let bcrypt = require("bcrypt") ;

passport.use(new LocalStrategy(async function(email, password, done) {

    try
    {
        let user = await userCollection.findOne({ email: email });

        if (!user) 
        { 
            return done(null, false , {message : "user not found"}); 
        }

        let isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched)
        { 
            return done(null, false , {message : "incorrect password"}); 
        }

        return done(null, user);

    }
    catch(err)
    {
        return done(err);
    }

}));


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

}) ;

// export codes 