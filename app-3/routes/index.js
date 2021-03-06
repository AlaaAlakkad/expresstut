const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// ROOT ROUTE
router.get("/", (req, res) =>{
    res.render("landing");
});


// REGISTER

router.get("/register",(req, res)=>{
    res.render("register");
});

router.post("/register", (req, res)=>{
    let newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});


// LOGIN

router.get("/login", (req, res )=>{
    res.render("login");
});

router.post("/login", passport.authenticate("local",({
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
})));


// LOGOUT

router.get("/logout", (req, res)=>{
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
});

module.exports = router;