module.exports = (app) => {
    const path         = require('path');
    const authenRoute2  = (req, res) => {
        console.log(req.isAuthenticated());
        if(req.isAuthenticated() !== true){
            return res.sendFile(path.resolve(__dirname, "..", "build/index.html"));
        }

        return res.redirect('/home');
    }

    const authenRoute  = (req, res) => {
        console.log(req.isAuthenticated());
        if(req.isAuthenticated()){
            return res.sendFile(path.resolve(__dirname, "..", "build/index.html"));
        }

        return res.redirect('/sign-in');
    }

    // desktop version screen 
    app.get("/chat", authenRoute);
    app.get('/info', authenRoute);

    // mobile version screen
    app.get(`/chat/:roomId`, authenRoute);
    app.get(`/chat/:userId`, authenRoute);

    // any version screen 
    app.get("/home", authenRoute)
    app.get('/sign-in', authenRoute2);
    app.get('/sign-up', authenRoute2);
}