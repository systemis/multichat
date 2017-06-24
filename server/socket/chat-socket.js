module.exports = server => {
    const io = require('socket.io')(server);
    io.on('connect', socket => {
        socket.on('message', message => {
            io.sockets.emit(`/receive/message/${message.receiveId}`, message);
        })
    })
};