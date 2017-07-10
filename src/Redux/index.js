import chatReducer   from './chat.js';
import userReducer   from './user.js';
import appReducer    from './app.js';

var redux = require('redux');

const defaultState = {
    versionScreen: 'desktop',
    isAding: false
}

const screenVersionReducer = (state = 'desktop', action) => {
    switch(action.type){
        case 'change screen version':
            return action.value;
        default:
            return state;
    }
}

const isAdingReducer = (state = false, action) => {
    switch(action.type){
        case 'change':
            return !state;
        default:
            return state;
    }
}

const chatId = (state = -1, action) => {
    switch(action.type){
        case 'change_chat_id':
            return action.value;
        default: 
            return state;
    }
}

const reducer = redux.combineReducers({
    indexShowSPM  : appReducer.indexShowScreenPageMobileReducer,
    screenVersion : screenVersionReducer,
    clientId      : userReducer.clientIdReducer,
    clientInfo    : userReducer.clientInfoReducer,
    userInfo      : userReducer.userInfoReducer,
    chatRoomId    : chatReducer.chatRoomIdReducer,
    chatRoomInfo  : chatReducer.chatRoomInfoReducer,
    chatId        : chatReducer.chatIdReducer,
    chatUserName  : chatReducer.chatUserNameReducer,
    usersList     : userReducer.usersListReducer,
    notifications : userReducer.notificationsReducer, 
    isAding       : isAdingReducer,
})

const store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension? window.devToolsExtension(): f => f
));

store.subscribe(() => {
    // console.log("Version screen: " + store.getState().userInfo);
    // console.log(store.getState().chatRoomInfo);
    // console.log(store.getState().notifications);
})

export default store;