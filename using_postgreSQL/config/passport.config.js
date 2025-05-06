// initial code 

"use strict";
console.clear();

// Starts The Main Code : 

// Require All The Modules , Packages And Objects : 

let passport = require("passport") ;
let bcrypt = require("bcrypt") ;
let connectionPool = require("./database.config") ;
let LocalStrategy = require("passport-local").Strategy ;

//Configure the passport-local : 

passport.use(new LocalStrategy(async function(username, password, done) {

        try
        {

            let userResult = await connectionPool.query("SELECT * FROM user_details WHERE username=$1" , [username]) ;
            let user = userResult.rows[0] ;

            if(!user)
            {
                return done(null , false , {message : "user not found!"}) ;
            }

            let isMatched = await bcrypt.compare(password , user.password) ;

            if (!isMatched) {
                return done(null, false, { message: "Incorrect password!" });
            }

            return done(null, user);

        }
        catch(error)
        {
            done(error) ;
        }
        
    }
    ));


passport.serializeUser(function(user , done){

    return done(null , user.id) ;

}) ;

passport.deserializeUser(async function(id , done){

    try
    {

        let userResult = await connectionPool.query("SELECT * FROM user_details WHERE id=$1" , [id]) ;
        let user = userResult.rows[0] ;

        return done(null, user) ;

    }
    catch(error)
    {
        done(error) ;
    }

})

// Exports Code :


