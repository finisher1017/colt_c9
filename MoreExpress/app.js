const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;
const ip = process.env.IP;

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Montana"];

app.get("/", function(req, res) {
   res.render("home"); 
});

app.get("/friends", function(req, res) {
   res.render("friends", {friends: friends}); 
});

app.post("/addfriend", function(req, res) {
    var newFriend = req.body.friend;
    friends.push(newFriend);
    res.redirect("/friends"); 
});

app.listen(port, ip, function() {
   console.log(`Server started on port ${port} - IP ${ip}`); 
});