const passort = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function (user, cb) {
    done(null, user);
});

passport.deserializeUser(function (user, cb) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "980413821209-nieja7mugk4q6ua5jplnrn1ibp1o0fbk.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        //use the profile info to check if the user is registered in the database
        //User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(null, profile);
        //once funciton is done, serialize the user and send it to the next middleware

    }
));