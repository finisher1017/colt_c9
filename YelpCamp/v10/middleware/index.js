var Campground = require("../models/campground");
var Comment = require("../models/comment");

// middleware module
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                // does user own the campground?
                if(foundCampground.author.id.equals(req.user.id)) {
                    return next();
                } else {
                    req.flash("error", "Permission denied.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Must be logged in.");
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                // does user own the comment?
                if(foundComment.author.id.equals(req.user.id)) {
                    return next();
                } else {
                    req.flash("error", "Permission denied");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "Must be logged in.");
        res.redirect("/login");
    }
}


module.exports = middlewareObj;