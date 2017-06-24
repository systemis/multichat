import io from 'socket.io-client'; 
import $  from 'jquery';
const socket = io.connect(`http://localhost:3000/`);

class chat{
    sendMessage(chatRoomId, message){
        if(chatRoomId){
            console.log(JSON.stringify({chatRoomId: chatRoomId, message: message}));
            socket.emit(`new_message`, {chatRoomId: chatRoomId, message: message});
        }
    }

    newRoom(clientId, chatId){
        const roomConfig = {
            id: clientId.toString() + chatId.toString(),
            id2: chatId.toString() + clientId.toString(),
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

    receiveMessage(chatRomId, fn){
        socket.on(`/receive/message/${chatRomId}`, data => {
            console.log("A new message: " + JSON.stringify(data.message));
            fn(JSON.stringify(data));
        })
    }

    checkChatRoomId(chatRomId, fn){
        $.ajax({
            url: `/check/chat-rom/${chatRomId}`, type: `POST`,
            success: data => {
                fn(data.err, data.bool);
            },
            error: err => fn(err, null)
        })
    }

    acessRom(chatRoomId, fn){
        $.ajax({
            url: `/get/chat-room-info/${chatRoomId}`, type: `POST`,
            success: data => {
                console.log(data);

                fn(data.err, data.result);
            },
            error: err =>{
                console.log(err);
                fn(err, null)
            }
        })
    }
}

export default new chat();