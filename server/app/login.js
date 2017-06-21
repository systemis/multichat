module.exports = (app) => {
    var passport      = require('passport');
    var passportLocal = require('passport-local');
    var path          = require('path');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new passportLocal.Strategy((username, password, done) => {
        console.log('Check ');
        console.log(username);
        var user = {
            username: username,
            password: password
        };

        if(username === 'test'){
            done('Test', null);
        }

        done(null, user);
    }))

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user);
    })

    app.post('/sign-in', passport.authenticate('local'), (req, res) => {
        res.redirect('/');
    })

    app.post('/sign-up', (req, res) => {
        console.log("Co nguoi dang dang ky bang email");
    })
}