const express = require("express");

const app = express();
const port = process.env.PORT;
const ip = process.env.IP;

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment.");
});

app.get("/speak/:animal", function(req, res) {
   console.log(req.params.animal);
   var animal = req.params.animal;
   var sounds = {
       pig: "oink",
       cow: "mooo",
       dog: "woof"
   };
   var sound = sounds[animal];
   res.send(`The ${animal} says ${sound}`);
});

app.get("/repeat/:greeting/:num", function(req, res) {
    var p = req.params;
    var greeting = p.greeting;
    var num = Number(p.num);
    var str = "";
    for (var i = 0; i < num; i++) {
        str = str + greeting + " ";
    }
    res.send(str);
   
});

app.get("*", function(req, res) {
   res.send("page note found");
});

app.listen(port, ip, function() {
    console.log(`Server started on port: ${port} - IP: ${ip}`)
});