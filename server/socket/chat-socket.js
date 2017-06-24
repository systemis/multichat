module.exports = server => {
    var io     = require('socket.io')(server);
    var chatMG = require('../model/database-room.js');
    io.on('connect', socket => {
        socket.on(`get_messages`, chatRoomId => {
            roomMD.findChatRoomById(chatRoomId, (err, result) => {
                if(!err){
                    io.sockets.emit(`/receive/message/${chatRoomId}`, result);
                }
            })
        })

        socket.on('new_message', data => {
            data = JSON.parse(data);

            const chatRoomId = data.chatRoomId;
            const message = JSON.stringify(data.message);

            console.log(console.log(data));

            chatMG.addMessage(chatRoomId, message, (err, result) => {
                if(!err){
                    roomMD.findChatRoomById(chatRoomId, (er, rs) => {
                        if(!er){
                            rs.users    = JSON.parse(rs.users);
                            rs.messages = JSON.parse(rs.messages);
                            io.sockets.emit(`/receive/message/${chatRoomId}`, rs);
                        }
                    })
                }
            })
        })
    })
};