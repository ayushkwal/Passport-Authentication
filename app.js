const express = require('express');
const app = express();
const controller = require('./controller/authControllers');
const profiler = require('./controller/profile');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

app.set('view engine', 'ejs');


app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.key],
}));

app.use(passport.initialize())
app.use(passport.session());
//connection to your mongo
mongoose.connect('mongodb+srv://ayush:ayush1002@cluster0.jawu5.mongodb.net/passport?retryWrites=true&w=majority');

controller(app);
app.use('/profile/', profiler);


app.listen(3000, () => {
    console.log('You are listening at port 3000');
})