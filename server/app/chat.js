module.exports = (app) => {
    var roomMD = require('../model/database-room.js');
    var userMD = require('../model/database-user.js');
    app.post(`/new/chat-room`, (req, res) => {
        var config = req.body;
        console.log(config);
        roomMD.newRoom(config, (err, result) => {
            if(err) return res.send({err: err, result: ""});

            const users = JSON.parse(config.users);
            users.map(userId => {
                userMD.addToRomsRequest(userId, config.id, (er, rs) => {
                    if(err) console.log(err);
                })
            }) 

            return res.send({err: null, result: "success"});
        })
    })
}