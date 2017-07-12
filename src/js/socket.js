import io  from 'socket.io-client';
const urlConnect1 = `http://localhost:3000/`;
const urlConnect2 = `https://chattogether.herokuapp.com/`;
const socket      = io.connect(urlConnect1);

class socketManager {
    sendMessage(chatRoomId, message){
        socket.emit(`new_message`, {chatRoomId: chatRoomId, message: message});
    }

    sendRequestRD(chatRoomId){
        socket.emit(`request_rd_message`, chatRoomId);
    }

    receiveMessage(chatRomId, fn){
        socket.on(`/receive/message/${chatRomId}`, data => {
            fn(data);
        })
    }

    receiveRequestRD(chatRoomId, fn){
        socket.on(`/receive/request_rd_message${chatRoomId}`, value => fn(value));
    }

    receiveNotifi(userId, fn){
        socket.on(`/receive/new-notifi/${userId}`, notifi => fn(notifi));
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

    removeListener(chatRoomId){
        socket.removeListener(`/receive/message/${chatRoomId}`)
        socket.removeListener(`/receive/request_rd_message${chatRoomId}`);
    }
}

export default new socketManager();