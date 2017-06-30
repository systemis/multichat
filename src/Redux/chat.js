import chatMG from '../js/chat.js';
const chatRoomInfoReducer = (state = "", action) => {
    switch(action.type){
        case `CHANGE_CHAT_ROOM_INFO`:
            console.log(`Change chat room info ${JSON.stringify(action.value)}`);

            return action.value;
        default: 
            return action;
    }
}

const chatRoomIdReducer = (state = "", action) => {
    switch(action.type){
        case `CHANGE_CHAT_ROOM_ID`:
            return action.value;
        default:
            return state;
    }
}


const chatIdReducer = (state = -1, action) => {
    switch(action.type){
        case "CHANGE_CHAT_ID":
            console.log(`Change chat id is ${action.value}`);
            return action.value;
        default:
            return state;
    }
}

const chatUserNameReducer = (state = "", action) => {
    switch(action.type){
        case "CHANGE_CHAT_USER_NAME":
            return action.value;
        default:
            return state;
    }
}

export default {
    chatRoomIdReducer: chatRoomIdReducer,
    chatRoomInfoReducer: chatRoomInfoReducer,
    chatIdReducer: chatIdReducer, 
    chatUserNameReducer: chatUserNameReducer
};