const express = require("express");
const passport = require("passport");

const router = express.Router();

console.log("AUTH ROUTE FILE LOADED");


// Test auth route
router.get("/auth/test", (req, res) => {
    res.json({
        message: "Auth routes are working"
    });
});


// Start GitHub OAuth login
router.get(
    "/auth/github",
    passport.authenticate("github", {
        scope: ["user:email"]
    })
);


// GitHub callback
router.get(
    "/auth/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/auth/test"
    }),
    (req, res) => {
        console.log("GitHub login successful");
        res.redirect("/profile");
    }
);


// Logout
router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    });
});


// Check current login status
router.get("/profile", (req, res) => {

    console.log("Profile check:", req.user);

    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: "You are not logged in"
        });
    }

    res.json({
        user: req.user
    });
});


module.exports = router;