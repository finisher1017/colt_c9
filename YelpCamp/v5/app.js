var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT;
var ip = process.env.IP;
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));




app.get("/", function(req, res) {
    res.render("home");
});

//INDEW - show all campgrounds
app.get("/campgrounds", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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

app.get("/campgrounds/:id/comments/new", function(req, res) {
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
app.post("/campgrounds/:id/comments", function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect(`/campgrounds/${campground.id}`);
                }
            });
            
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
});



app.listen(port, ip, function() {
    console.log(`Server started on port ${port} - IP ${ip}`);
});