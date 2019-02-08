const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


// POST title content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

// USER email name
var userSchema = new mongoose.Schema ({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);



User.findOne({name: "Jonathan Seubert"}, function(err, foundUser) {
    if(err) {
        console.log(err);
    } else {
        // console.log(foundUser);
        foundUser.posts.push({
            title: "Another added post",
            content: "Content for another added post."
        });
        foundUser.save(function(err, foundUser) {
            if(err) {
                console.log(err);
            } else {
                console.log(foundUser);
            }
        });
    } 
});
// newUser.save(function(err, user) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Third test post",
//     content: "This is the third test post"
// });

// newPost.save(function(err, post) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });



// newUser.posts.push({
//     title: "Post in array", 
//     content: "Post of content from array"
// });

// newUser.save(function(err, user) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });