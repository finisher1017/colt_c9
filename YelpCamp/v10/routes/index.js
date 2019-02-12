var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//================
//MAIN ROUTE
//================

router.get("/", function(req, res) {
    res.render("home");
});



//================
//AUTH ROUTES
//================

// show register form
router.get("/register", function(req,res) {
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err){
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});


//show login form
router.get("/login", function(req, res) {
    res.render("login", {currentUser: req.user});
});

//handle login
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

// logic route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});


//MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}


module.exports = router;