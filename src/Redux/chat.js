const chatRoomInfoReducer = (state = {}, action) => {
    switch(action.type){
        case `CHANGE_CHAT_ROOM_INFO`:
            console.log(`Change chat room info: ${action.value}`);
            return action.value;
        default: 
            return action;
    }
}

const chatRoomIdReducer = (state = "", action) => {
    switch(action.type){
        case "CHANGE_CHAT_ROOM_ID":
            console.log(`Change chat room id ${action.value}`);
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
            console.log("Change chat user name: " + action.value);
            return action.value;
        default:
            return state;
    }
}

module.exports = {
    chatRoomIdReducer: chatRoomIdReducer,
    chatRoomInfoReducer: chatRoomInfoReducer,
    chatIdReducer: chatIdReducer, 
    chatUserNameReducer: chatUserNameReducer
};