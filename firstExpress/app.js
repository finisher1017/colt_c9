var express = require("express");

var app = express();


app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.get("/bye", function(req, res) {
   res.send("Goodbye World!"); 
});

app.get("/dog", function(res, res) {
    console.log("get request made to /dog");
    res.send("MEOW!");
});

app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    res.send(`Welcome to ${subreddit}`); 
});

app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
    console.log(req.params);
    res.send("Welcome to comments"); 
});

app.get("*", function(req, res) {
    res.send("page note found");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!")
});
