module.exports = (server, onlineUser) => {
    var io     = require('socket.io')(server);
    var roomMD = require('../model/database-room.js');
    io.on('connect', socket => {
        socket.on(`get_messages`, chatRoomId => {
            roomMD.findChatRoomById(chatRoomId, (err, result) => {
                if(!err){
                    io.sockets.emit(`/receive/message/${chatRoomId}`, result);
                }
            })
        })

        socket.on('new_message', data => {
            const chatRoomId = data.chatRoomId;
            const message    = data.message;

            roomMD.addMessage(chatRoomId, message, (err, result) => {
                if(!err){
                    roomMD.findChatRoomById(chatRoomId, (er, rs) => {
                        if(!er){
                            io.sockets.emit(`/receive/message/${chatRoomId}`, rs);
                        }
                    })
                }else{
                    console.log(err);
                }
            })
        })

        socket.on(`online`, data => {
            console.log(data);
            console.log(`User have id is ${data.userId} have just online`);
        })

        socket.on(`offLine`, data => {
            const {userId} = data;
            console.log(data);
            console.log(`Disconnect server from ${userId}`);

            onlineUser = onlineUser.slice(onlineUser.indexOf(userId));
        })
    })
};