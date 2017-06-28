module.exports = (app) => {
    var path   = require('path');
    var userDM = require('../model/database-user.js');
    var roomMD = require('../model/database-room.js');

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

                console.log(err);
                console.log(finalResult);
                return res.send({err: null, result: finalResult});
            })
        }
    })

    app.post(`/add/friend`, (req, res) => {
        const clientId = req.body.clientId;
        const friendId = req.body.friendId;

        userDM.addFriend(clientId, friendId, (err, result) => {
            userDM.addFriend(friendId, clientId, (_err, _result) => {
                return res.send({_err, _result}); 
            });
        })
    })

    app.post('/get/users/list/:clientId', (req, res) => {
        var clientId  = req.params.clientId;
        var usersList = [];

        userDM.getFriends(clientId, (err, result) => {
            result.map((userId, index) => {
                userDM.findUserById(userId, (err, userItem) => {
                    if(!err && userItem !== 'NOT_REGISTER'){
                        usersList.push(userItem);
                    }

                    if(index === result.length - 1){
                        console.log(usersList)
                        return res.send({err: null, result: usersList});
                    }
                })
            }) 
        })
    })

    app.post('/save/message', (req, res) => {
        const message  = req.body.message;
        if(message.receiveId === clientId){
            message.receiveId = message.sendId;
            message.sendId    = clientId;
        }
    })
}