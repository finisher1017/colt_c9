var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT;
var ip = process.env.IP;
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg",
//         description: "The is some long description for the Granite Hill campgound."
        
//     }, function(err, campground) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Created New Campground");
//             console.log(campground);
//         }
//     });

// var campgrounds = [
//             {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
//             {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
//             {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b014459cf4c671a6efbc_340.jpg"},
//             {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
//             {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
//             {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b014459cf4c671a6efbc_340.jpg"},
//             {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
//             {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
//             {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b014459cf4c671a6efbc_340.jpg"}
//         ];

app.get("/", function(req, res) {
    res.render("home");
})

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