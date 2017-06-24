module.exports = server => {
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
            const message    =    data.message;

            roomMD.addMessage(chatRoomId, message, (err, result) => {
                if(!err){
                    roomMD.findChatRoomById(chatRoomId, (er, rs) => {
                        if(!er){
                            console.log("New message");
                            io.sockets.emit(`/receive/message/${chatRoomId}`, rs);
                        }
                    })
                }else{
                    console.log(err);
                }
            })
        })
    })
};