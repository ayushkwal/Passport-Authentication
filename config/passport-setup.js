const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const data = require('../models/user');

//serialise function
passport.serializeUser((user, done) => {
    done(null, user.id) //1st parameter is for error and other is for id we recieve
});

//deserialise function
passport.deserializeUser((id, done) => {

    data.findById(id, function(err, user) {
        done(err, user);
    });
    //1st parameter is for error and other is for id we recieve
});





//deserialise function

//telling passport that we are going to use google strategy (It also contains callback function)
passport.use(new GoogleStrategy({
    //google strategy
    callbackURL: '/google/redirect',
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret,

}, async(accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log(profile);
    const userExist = await data.findOne({ googleId: profile.id });
    if (userExist) {
        console.log('user already registered');
        done(null, userExist);
    } else {
        const save = await data.create({ 'username': profile.displayName, 'googleId': profile.id, 'thumbnail': profile._json.picture });
        done(null, save);
        console.log('user created');
        console.log(save);

    }


}))