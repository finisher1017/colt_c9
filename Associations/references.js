const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

const Post = require("./models/post");
const User = require("./models/user.js");




// User.findOne({email: "jseubert@megajon.com"}).populate("posts").exec(function(err, user) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

Post.create({
    title: "How to coook the best tacos part 7",
    content: "aaaaaaaaaaaaaaaaaa"
}, function(err, post) {
    User.findOne({email: "jseubert@megajon.com"},function(err, foundUser) {
        if(err) {
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

// User.create({
//     email: "jseubert@megajon.com",
//     name: "Jonny Seubs"
// });