import io from 'socket.io-client'; 
const socket = io.connect(`http://localhost:3000/`);

class chat{
    sendMessage(message){
        console.log("Sending message ")
        socket.emit(`message`, message);
    }

    receiveMessage(clientId, fn){
        console.log('client id: ' + clientId);
        console.log(`/receive/message/${clientId}`);
        socket.on(`/receive/message/${clientId}`, message => {
            console.log("A new message: " + JSON.stringify(message));
            fn(message);
        })
    }
}

export default new chat();