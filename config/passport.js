const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            scope: ["user:email"]
        },

        async function (accessToken, refreshToken, profile, done) {

            try {

                let user = await User.findOne({
                    githubId: profile.id
                });


                if (user) {

                    user.username = profile.username;
                    user.name = profile.displayName;
                    user.email = profile.emails?.[0]?.value;
                    user.avatar = profile.photos?.[0]?.value;

                    await user.save();

                    return done(null, user);

                }


                user = await User.create({

                    githubId: profile.id,

                    username: profile.username,

                    name: profile.displayName,

                    email: profile.emails?.[0]?.value,

                    avatar: profile.photos?.[0]?.value,

                    provider: "github"

                });


                return done(null, user);


            } catch (error) {

                return done(error, null);

            }

        }
    )
);


// Save user ID into session
passport.serializeUser((user, done) => {

    done(null, user._id);

});


// Retrieve user from database
passport.deserializeUser(async (id, done) => {

    try {

        const user = await User.findById(id);


        if (!user) {

            return done(null, false);

        }

        done(null, user);


    } catch (error) {

        done(error, null);

    }

});


module.exports = passport;