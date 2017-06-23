class ChatSocket{
    constructor(socket){
        this.socket = socket
    }

    receiveMessage(){
        this.socket.on('message', message => {
            console.log("New message " + JSON.stringify(message));
            console.log(`/receive/message/${message.id}`);
            this.socket.emit(`/receive/message/${message.id}`, message);
        })
    }

    sendMessage(message){
        console.log("Send emit");
        console.log(message.id);
        this.socket.emit(`/receive/message/${message.id}`, message);
    }
}

module.exports = ChatSocket;