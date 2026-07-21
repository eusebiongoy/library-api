const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

// Save user information into session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Retrieve user information from session
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;