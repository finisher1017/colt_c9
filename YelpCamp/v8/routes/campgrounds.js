var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


//====================
//CAMPGROUNDS ROUTES
//====================


//INDEW - show all campgrounds
router.get("/", function(req, res) {
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
router.post("/", function(req, res) {
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
router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - show more information about one campground
router.get("/:id", function(req, res) {
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

module.exports = router;