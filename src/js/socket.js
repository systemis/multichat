import io from 'socket.io-client';
const socket = io.connect(`http://localhost:3000/`);
class socketManager {
    sendMessage(chatRoomId, message){
        socket.emit(`new_message`, {chatRoomId: chatRoomId, message: message});
    }

    receiveMessage(chatRomId, fn){
        socket.on(`/receive/message/${chatRomId}`, data => {
            fn(data);
        })
    }

    disConnect(userId){
        console.log(`Offlining `);

        socket.emit(`offLine`, {userId: userId});
    }

    checkOnline(userId, fn){
        socket.on(`check_online_user/${userId}`, isOnline => {
            fn(isOnline);
        })
    }
}

export default new socketManager();