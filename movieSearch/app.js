var request = require("request");
var express = require("express");
const bodyParser = require("body-parser");
var app = express();
const port = process.env.PORT;
const ip = process.env.IP;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/results", function(req, res) {
    var searchData = req.query.search;
    request(`http://www.omdbapi.com/?s=${searchData}&apikey=thewdb`, function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            if(response.statusCode == 200) {
                console.log(searchData);
                const parsedData = JSON.parse(body);
                // console.log(body);
                res.render("results", {parsedData: parsedData});
            }
        }
    });
});


app.listen(port, ip, function() {
   console.log(`Server started on port ${port} - IP ${ip}`); 
});

