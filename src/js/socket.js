import io  from 'socket.io-client';
const urlConnect1 = `http://localhost:9999/`;
const urlConnect2 = `https://chattogether.herokuapp.com/`;
const socket      = io.connect(urlConnect1);

socket.on('disconnect', () => {
    console.log('You are disconnecting !')
});

class socketManager {
    onLineEvent(userId){
        socket.userId = userId;
        socket.emit('onLine', {userId: userId});
    }

    sendMessage(chatRoomId, message){
        socket.emit(`new_message`, {chatRoomId: chatRoomId, message: message});
    }

    sendRequestRD(chatRoomId){
        socket.emit(`request_rd_message`, chatRoomId);
    }

    receiveMessage(chatRoomId, fn){
        socket.on(`/receive/message/${chatRoomId}`, data => {
            fn(data);
        })
    }

    receiveRequestRD(chatRoomId, fn){
        socket.on(`/receive/request_rd_message${chatRoomId}`, value => fn(value));
    }

    receiveNotifi(userId, fn){
        socket.on(`/receive/new-notifi/${userId}`, notifi => fn(notifi));
    }

    disConnect(){
        socket.disconnect();
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