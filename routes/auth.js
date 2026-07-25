const express = require("express");
const passport = require("passport");

const router = express.Router();

console.log("AUTH ROUTE FILE LOADED");


// Test route
router.get("/auth/test", (req, res) => {
    res.json({
        message: "Auth routes are working"
    });
});



// GitHub login
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

        req.session.save((err)=>{

            if(err){
                return res.status(500).json({
                    message:"Session save failed"
                });
            }

            res.redirect("/auth/success");

        });

    }
);


// Success page
router.get("/auth/success", (req,res)=>{

    res.json({

        message:"GitHub login successful",

        authenticated:req.isAuthenticated(),

        user:req.user

    });

});

// Profile
router.get("/profile",(req,res)=>{


    console.log("PROFILE USER:", req.user);


    if(!req.isAuthenticated()){

        return res.status(401).json({

            message:"You are not logged in"

        });

    }


    res.json({

        message:"Your GitHub profile",

        user:req.user

    });


});




// Logout
router.get("/logout",(req,res,next)=>{


    req.logout((err)=>{

        if(err){
            return next(err);
        }


        req.session.destroy(()=>{


            res.json({

                message:"Logged out successfully"

            });


        });


    });


});




// Debug session
router.get("/debug/session",(req,res)=>{


    res.json({

        session:req.session,

        user:req.user || null,

        authenticated:req.isAuthenticated()

    });


});



module.exports = router;