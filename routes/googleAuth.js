const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "/login", failureFlash: true }),
    (req, res) => {
        req.flash("success", `Welcome, ${req.user.username}!`);
        res.redirect("/listings");
    }
);

module.exports = router;
