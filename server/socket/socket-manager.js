var roomMD      = require('../model/database-room.js');
var io          = "";
var lastUserOn  = "";
var onlineUsers  = []
class socketMG{
    constructor(server, _onlineUsers){
        io          = require('socket.io')(server);
        lastUserOn  = _onlineUsers[_onlineUsers.length - 1]
        onlineUsers  = _onlineUsers
    }

    mainHandler(){
        console.log(`lastUserOn: ${lastUserOn}`);
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

                message.date     = new Date().toLocaleString(); 

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
                const userId = data.userId;

                onlineUsers.splice(onlineUsers.indexOf(userId), 1);
                lastUserOn  = onlineUsers[onlineUsers.length - 1];

                console.log(`Online users id offLine: ${JSON.stringify(onlineUsers)}`);
                console.log(`Online users id offLine: ${lastUserOn}`);

                io.sockets.emit(`check_online_user/${userId}`, false);
            })

            setInterval(() => {
                const lT     = onlineUsers.length - 1;
                const userId = onlineUsers[lT];

                if(userId !== lastUserOn){
                    console.log(userId);
                    console.log('New online user');

                    io.sockets.emit(`check_online_user/${userId}`, true);

                    lastUserOn = onlineUsers[lT];
                }
            }, 5000)
        })
    }
}

module.exports = socketMG;