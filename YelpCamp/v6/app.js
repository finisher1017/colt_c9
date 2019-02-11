var express = require("express");
var app = express();
var expressSession = require("express-session");
var bodyParser = require("body-parser");
var port = process.env.PORT;
var ip = process.env.IP;
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//PASSPORT CONFIGURATION
app.use(expressSession({
    secret: "megajon",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


//===================
//ROUTES
//===================

app.get("/", function(req, res) {
    res.render("home");
});

//INDEW - show all campgrounds
app.get("/campgrounds", function(req, res) {
    console.log(req.user);
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});


//Campgrounds post router
app.post("/campgrounds", function(req, res) {
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // add to campgrounds array
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// Show form to create new campgrounds
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - show more information about one campground
app.get("/campgrounds/:id", function(req, res) {
    //Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            // render show template with individual campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// ======================
// COMMENTS ROUTES
// ======================

//route for campground comments form
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//comment POST route
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground show page
                    res.redirect(`/campgrounds/${campground.id}`);
                }
            });
            
        }
    });
});


//================
//AUTH ROUTES
//================

// show register form
app.get("/register", function(req,res) {
    res.render("register");
});

//handle signup logic
app.post("/register", function(req, res) {
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
app.get("/login", function(req, res) {
    res.render("login", {currentUser: req.user});
});

//handle login
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/logn"
    }), function(req, res) {
});

//logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

// logic route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

//logout route
app.get("/logout", function(req, res) {
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

//START SERVER
app.listen(port, ip, function() {
    console.log(`Server started on port ${port} - IP ${ip}`);
});