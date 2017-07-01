import $        from 'jquery';
import socketMG from './socket.js';

// Use for check is access to room by id where user want to access room. USAGE: easy and fast  
var timeRequestCheckAccess = 0;
var isAccessRoom = false;

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
                socketMG.sendMessage(chatRoomId, message);
            }else{
                alert(`Bạn không được phép truy cập, vui kiểm tra lại sau !`);
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
            },
            error: err => console.log(`New room failure ${JSON.stringify(err)}`)
        })
    }

    receiveMessage(chatRomId, fn){
        socketMG.receiveMessage(chatRomId, fn);
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
                        fn(data.err, data.result);
                    },
                    error: err =>{
                        fn(err, null)
                    }
                })
            }else{
                fn("Not access", null);
            }
        })
    }

    update(){
        timeRequestCheckAccess = 0;
        isAccessRoom = false;
    }
}

export default new chat();