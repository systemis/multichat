module.exports = (app) => {
    var roomMD = require('../model/database-room.js');
    var userMD = require('../model/database-user.js');
    
    app.post(`/new/chat-room`, (req, res) => {
        var config = req.body;
        delete config.id2;
        roomMD.newRoom(config, (err, result) => {
            if(err) return res.send({err, result});

            const users = JSON.parse(config.users);
            users.map(userId => {
                userMD.addToRomsRequest(userId, config.id, (er, rs) => {
                    if(err) console.log(err);
                })
            }) 

            return res.send({err: null, result: "success"});
        })
    })

    app.post(`/check/chat-rom/:id`, (req, res) => {
        const chatRoomId = req.params.id;
        roomMD.checkAlreadyId(chatRoomId, (err, bool) => {
            return res.send({err, bool});
        })
    })

    app.post(`/get/chat-room-info/:id`, (req, res) => {
        console.log(req.isAuthenticated);
        if(req.isAuthenticated()){
            const chatRoomId = req.params.id;
            roomMD.findChatRoomById(chatRoomId, (err, result) => {
                // Pase error; 
                console.log(chatRoomId);

                if(err) { console.log(err); return res.send({err: err, result: null}); }

                console.log(result.users);
                if(result.users.indexOf(req.user.id) >= 0){
                    console.log(`JSON ${result}`);

                    return res.send({err, result});
                }else{
                    return res.send({err: "Erro: Some wrong", result: null});
                }
            })
        }else{
            return res.send({err: "Error: Not login", result: null});
        }
    })
}