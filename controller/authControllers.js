const passport = require('passport');
const passportSetup = require('../config/passport-setup');

module.exports = function(app) {
    console.log('control actives!');

    app.get('/', (req, res) => { //Home Page
        res.render('home.ejs');
    });

    app.get('/login', (req, res) => { //login Page
        res.render('login.ejs');
    });

    app.get('/logout', (req, res) => { //logout Page
        req.logout();
        res.redirect('/');
    });

    app.get('/google', passport.authenticate('google', {
        scope: ['profile']
    }));

    app.get('/google/redirect', passport.authenticate('google'), (req, res) => {
        console.log(req.user);
        var a = req.user.username;
        res.redirect('/profile/');
    });
}