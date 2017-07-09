import io  from 'socket.io-client';
const urlConnect1 = `http://localhost:3000/`;
const urlConnect2 = `https://chattogether.herokuapp.com/`;
const socket      = io.connect(urlConnect2);

class socketManager {
    sendMessage(chatRoomId, message){
        socket.emit(`new_message`, {chatRoomId: chatRoomId, message: message});
    }

    receiveMessage(chatRomId, fn){
        socket.on(`/receive/message/${chatRomId}`, data => {
            fn(data);
        })
    }

    receiveRequestRD(chatRoomId, fn){
        socket.on(`send_request_rd_message${chatRoomId}`, value => fn(true));
    }

    sendRequestRD(chatRoomId){
        socket.emit(`request_rd_message`, chatRoomId);
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
        socket.removeListener(`send_request_rd_message${chatRoomId}`);
    }
}

export default new socketManager();