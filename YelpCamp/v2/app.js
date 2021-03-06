var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT;
var ip = process.env.IP;
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");

seedDB.seedDB();
console.log("this is the app file.");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");




app.get("/", function(req, res) {
    res.render("home");
});

app.get("/campgrounds", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

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
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res) {
    //Find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(port, ip, function() {
    console.log(`Server started on port ${port} - IP ${ip}`);
});