var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT;
var ip = process.env.IP;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
            {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
            {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
            {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b014459cf4c671a6efbc_340.jpg"},
            {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
            {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
            {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b014459cf4c671a6efbc_340.jpg"},
            {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
            {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f9c57eafecb7b1_340.jpg"},
            {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b014459cf4c671a6efbc_340.jpg"}
        ];

app.get("/", function(req, res) {
    res.render("home");
})

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res) {
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    // add to campgrounds array
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
    
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})

app.listen(port, ip, function() {
    console.log(`Server started on port ${port} - IP ${ip}`);
});