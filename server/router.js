module.exports = (app) => {
    const path         = require('path');
    const defaultRoute = (req, res) => res.sendFile(path.resolve(__dirname, "..", "build/index.html"));

    app.get("/", defaultRoute)
    app.get("/chat", defaultRoute);
    app.get('/info', defaultRoute);
    app.get('/sign-in', defaultRoute);
}