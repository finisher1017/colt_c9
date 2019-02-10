var express = require("express");
var expressSession = require("express-session");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

var port = process.env.PORT;
var ip = process.env.IP;

mongoose.connect("mongodb://localhost/auth_db");


var app = express();

app.use(expressSession({
    secret: "I am megajon!",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=====================
//ROUTES
//=====================


app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
});

// AUTH ROUTES

//show sign up form
app.get("/register", function(req, res) {
    res.render("register");
});

//handling user sign up
app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err){
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secret");
            });
        }
    });
});


//LOGIN ROUTES

//render login form
app.get("/login", function(req, res) {
    res.render("login");
});

//login logic - POST
//middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
    
});


//logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}


app.listen(port, ip, function() {
    console.log(`server started on ${port} - ${ip}`);
});