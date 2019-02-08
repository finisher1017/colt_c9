var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));



// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Another Test Blog",
//   image: "https://images.unsplash.com/photo-1549383761-180102efa02c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   body: "ANOTHER TEST BLOG POST"
// });


// RESTFUL ROUTES

app.get("/", function(req, res) {
    res.redirect("/blogs");
})

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

//CREATE BLOGS GET ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE BLOGS POST ROUTE
app.post("/blogs", function(req, res) {
    //create blog
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW BLOGS

app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE

app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});


// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err) {
            res.redirect("/blog");
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});


// DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
    res.send("DESTROY ROUTE");
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running.");
});