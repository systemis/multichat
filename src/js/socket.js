import io from 'socket.io-client';
const urlConnect1 = `http://localhost:3000/`;
const urlConnect2 = `https://chattogether.herokuapp.com/`;
const socket = io.connect(urlConnect2);

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