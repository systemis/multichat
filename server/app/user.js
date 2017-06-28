module.exports = (app) => {
    var path   = require('path');
    var userDM = require('../model/database-user.js');

    app.post('/get/client-info', (req, res) => {
        if(!req.isAuthenticated()){
            return res.send("NOT_LOGIN");
        }else{
            return res.send(req.user)
        }
    })

    app.post('/get/user-info/:id', (req, res) => {
        const idFind = req.params.id;
        userDM.findUserById(id, (err, result) => {
            if(err) {
                res.send("ERROR");
                console.log("Error when get info" + result);
            }else{
                if(result === "NOT_REGISTER"){
                    res.send("NOT_REGISTER");
                }else{
                    res.send(result);
                };
            }
        })    
    })

    app.post(`/find/users-by-name/:name`, (req, res) => {
        const userName = req.params.name.toLowerCase();
        if(req.isAuthenticated()){
            userDM.getUserlist((err, result) => {
                if(err) return res.send({err: 'Error', result: null});

                var finalResult = [];
                for(var i = 0; i < result.length; i++){
                    if(result[i].name.toLowerCase().indexOf(userName) >= 0 && result[i].id !== req.user.id){
                        finalResult.push(result[i]);
                    }
                }

                return res.send({err: null, result: finalResult});
            })
        }
    })

    app.post('/save/message', (req, res) => {
        const message  = req.body.message;
        if(message.receiveId === clientId){
            message.receiveId = message.sendId;
            message.sendId    = clientId;
        }
    })

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })
}