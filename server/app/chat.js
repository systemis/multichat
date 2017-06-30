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
        console.log(chatRoomId);
        roomMD.checkAlreadyId(chatRoomId, (err, bool) => {
            console.log(bool);
            return res.send({err, bool});
        })
    })

    app.post(`/get/chat-room-info/:id`, (req, res) => {
        if(req.isAuthenticated()){
            const chatRoomId = req.params.id;
            roomMD.findChatRoomById(chatRoomId, (err, result) => {
                // Pase error; 
                if(err) { console.log(err); return res.send({err: err, result: null}); }
                return res.send({err, result});
            })
        }else{
            return res.send({err: "Error: Not login", result: null});
        }
    })

    app.post('/check/access/chat-room/:chatRoomId', (req, res) => {
        const chatRoomId = req.params.chatRoomId;
        if(req.isAuthenticated()){
            roomMD.findChatRoomById(chatRoomId, (err, result) => {
                if(err){ 
                    return res.send({err, result});
                }

                if(result.users.indexOf(req.user.id) >= 0){
                    return res.send({err: null, result: true});
                }else{
                    return res.send({err: null, result: false});
                }
            })
        }else{
            return res.send({err: null, result: false});
        }
    })
}