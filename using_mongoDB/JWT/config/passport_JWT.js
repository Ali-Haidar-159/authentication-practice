// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let userCollection = require("../model/user.model") ;
let passport = require("passport") ;
require("dotenv").config() ;

var JwtStrategy = require('passport-jwt').Strategy ;
let   ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY ;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        let user = await userCollection.findOne({ _id: jwt_payload.id }); // ✅ async await

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));




// export codes 