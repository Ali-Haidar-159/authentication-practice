"use strict";
console.clear();

// main code

// require all the modules, packages, objects

let express = require("express");
let app = express();

let morgan = require("morgan");
let path = require("path");
let ejs = require("ejs");
let dev = require("./config/config");
const userRoute = require("./router/user.router");
require("./authentication/user.authentication") ;

let passport = require("passport");
let session = require("express-session");
const MongoStore = require('connect-mongo');

// connect with server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up view engine and views path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// logging middleware
app.use(morgan("dev"));

// session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: dev.db_url.url,
        collectionName: "session&cookie"
    })
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());



// routing
app.use(userRoute);

// request-response cycle
app.get("/", function (req, res) {
    res.status(200).render("home");
});

// handle the route error
app.use(function (req, res, next) {
    res.status(404).json({
        status: 404,
        message: "Page not found"
    });
});

// handle server error
app.use(function (err, req, res, next) {
    res.status(500).json({
        status: 500,
        message: "There is a server error",
        error: err.message,
    });
});

// export codes
module.exports = app;
