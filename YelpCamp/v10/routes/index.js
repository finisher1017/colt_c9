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
            req.flash("error", err.message);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", `Hello, ${user.username} Welcome to YelpCamp`);
                res.redirect("/campgrounds");
            });
        }
    });
});


//show login form
router.get("/login", function(req, res) {
    res.render("login");
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
    req.flash("success", "Logout Completed");
    res.redirect("/campgrounds");
});

// // logic route
// router.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/campgrounds");
// });

// //logout route
// router.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/campgrounds");
// });



module.exports = router;