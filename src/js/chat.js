import io from 'socket.io-client'; 
import $  from 'jquery';

var timeRequestCheckAccess = 0;
var isAccessRoom = false;
var socket = io.connect(`http://localhost:3000/`);

class chat{
    checkAccessRoom(chatRoomId, fn){
        if(chatRoomId){
            if(timeRequestCheckAccess === 0){
                $.ajax({
                    url: `/check/access/chat-room/${chatRoomId}`, type: `POST`,
                    success: data => {
                        if(data.err) return fn(false);
                        if(data.result === false) return fn(false);

                        isAccessRoom = true;                        
                        
                        return fn(true);
                    },
                    error: err => fn(false)
                })

                timeRequestCheckAccess ++;
            }else{
                if(isAccessRoom === false) {return fn(false)}
                return fn(true);
            }
        }else{
            return ;
        }
    }

    sendMessage(chatRoomId, message){
        this.checkAccessRoom(chatRoomId, isAccess => {
            if(isAccess){
                socket.emit(`new_message`, {chatRoomId: chatRoomId, message: message});
            }else{
                alert('ban khong duoc phep');
            }
        })
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
            fn(data);
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
        this.checkAccessRoom(chatRoomId, isAccess => {
            if(isAccess){
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
            }else{
                fn("Not access", null);
            }
        })
    }
}

export default new chat();