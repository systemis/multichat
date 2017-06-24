import io from 'socket.io-client'; 
import $  from 'jquery';
const socket = io.connect(`http://localhost:3000/`);

class chat{
    sendMessage(message){
        socket.emit(`message`, message);
        this.saveMessage(message);
    }

    newRoom(clientId, chatId){
        const roomConfig = {
            id: clientId.toString() + chatId.toString(),
            users: JSON.stringify([clientId, chatId]),
            messages: JSON.stringify([]),
        }

        $.ajax({
            url: '/new/chat-room', type: 'POST', data: roomConfig,
            success: data => {
                if(data.err){
                    return console.log(`New room failure ${data.err}`)
                }
                
                console.log("New room success: " + data.result);
            },
            error: err => console.log(`New room failure ${JSON.stringify(err)}`)
        })
    }

    receiveMessage(clientId, fn){
        socket.on(`/receive/message/${clientId}`, message => {
            console.log("A new message: " + JSON.stringify(message));
            fn(message);
        })
    }

    saveMessage(message){
        $.ajax({
            url: `/save/message`, type: `POST`,
            data: {
                message: message    
            },
            success: data => {
                console.log(data);
            },
            error: err => console.log(err)
        })
    }
}

export default new chat();