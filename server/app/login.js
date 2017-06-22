module.exports = (app) => {
    var passport      = require('passport');
    var passportfb    = require('passport-facebook');
    var passportLocal = require('passport-local');
    var userDM        = require('../model/database-user.js');
    var path          = require('path');

    
    app.use(passport.initialize());
    app.use(passport.session());


    passport.use(new passportLocal.Strategy((username, password, done) => {
        var user = { username: username };
        userDM.checkLogin(username, password, (err, message, result) => {
            console.log("Result login: " + message);
            switch(message){
                case "OK":
                    delete result.password;
                    user = result;
                    return done(null, user);
                case "CORRECT":
                    return done("Password khong dung", false);
                case "NOT_REGISTER":
                    return done("Email chua duoc dang ky", false);
                default:
                    return done("Co mot so loi xay ra", false);
            }
        })
    }))
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user);
    })
    passport.deserializeUser((user, done) => {
        done(null, user);
    })

    // Handling when client sign in 
    app.post('/sign-in', passport.authenticate('local'), (req, res) => {
        res.redirect('/home');
    })

    app.post('/sign-up', (req, res) => {
        userDM.newUser(req.body, (err, result) => {
            console.log("Co nguoi dang dang ky bang email");
            console.log(req.body);
            if(err){
                switch(result){
                    case 'exists': 
                        res.send({err: true, message: "Account already exists"});
                        break;
                    default:
                        res.send({err: true, message: "Some error, try again after 5 minute"});
                        break
                }
            }

            res.send({err: false, message: 'Register success'});
        })
    })


    app.get('/auth/fb', passport.authenticate('facebook', {scope: ['email']}));
    app.get('/login-facebook', passport.authenticate('facebook', {failureRedirect: '/sign-in', successRedirect: '/home'}));
    passport.use(new passportfb(
        {
            clientID: '',
            clientSecret: '',
            callbackURL: 'http://localhost:3000/login-facebook',
            profileFields: ['email', 'gender', 'locale', 'displayName']
        },
        (accessToken, refreshToken, profile, done) => {
            const info = profile._json;
            const user = {
                id: info.id,
                name: info.name,
                email: info.email,
                password: info.id,
                gender: info.gender,
                language: info.locale,
            }
            
            userDM.newUser(user, (err, result) => {
                done(null, user);
            })
        }))
}