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

    app.post('/get/user-list', (req, res) => {
        if(req.isAuthenticated()){
            userDM.getUserlist((err, result) => {
                if(err === false){
                    for(var i = 0; i < result.length; i++){
                        if(result[i].id === req.user.id){
                            delete result[i];
                        }

                        if(i === result.length - 1){
                            res.send({err: false, result: result});
                        }
                    }
                }else{
                    res.send({err: true, result: "Error"});
                }
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