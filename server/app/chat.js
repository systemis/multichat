module.exports = (app) => {
    var roomMD = require('../model/database-room.js');
    var userMD = require('../model/database-user.js');
    
    app.post(`/new/chat-room`, (req, res) => {
        var config = req.body;
        roomMD.checkAlreadyId(config.id, (error, bool) => {
            if(!error){
                if(!bool){
                    roomMD.checkAlreadyId(config.id2, (error2, bool2) => {
                        if(!error2){
                            if(!bool2){
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
                            }
                        }
                    })
                }
            }
        })
    })

    app.post(`/check/chat-rom/:id`, (req, res) => {
        const chatRoomId = req.params.id;
        roomMD.checkAlreadyId(chatRoomId, (err, bool) => {
            return res.send({err, bool});
        })
    })

    app.post(`/get/chat-room-info/:id`, (req, res) => {
        const chatRoomId = req.params.id;
        roomMD.findChatRoomById(chatRoomId, (err, result) => {
            console.log(`JSON ${result}`);

            return res.send({err, result});
        })
    })
}