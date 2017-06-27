import chatMG from '../js/chat.js';
const chatRoomInfoReducer = (state = "", action) => {
    switch(action.type){
        case `CHANGE_CHAT_ROOM_INFO`:
            return action.value;
        default: 
            return action;
    }
}

const chatRoomIdReducer = (state = "", action) => {
    switch(action.type){
        case "CHANGE_CHAT_ROOM_ID":
            return action.value;
        default:
            return state;
    }
}


const chatIdReducer = (state = -1, action) => {
    switch(action.type){
        case "CHANGE_CHAT_ID":
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