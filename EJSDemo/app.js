const express = require("express");
const app = express();
const port = process.env.PORT;
const ip = process.env.IP;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
   res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res) {
    var thing = req.params.thing;
    res.render(`love`, {thingVar: thing})
});

app.get("/posts", function(req, res) {
   var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you believe this pomsky?", author: "Colt"}
    ];
    
    res.render("posts", {posts: posts});
});

app.listen(port, ip, function() {
    console.log(`Server started on port: ${port} - IP: ${ip}`);
});