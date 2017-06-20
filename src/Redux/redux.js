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
    screenVersion: screenVersionReducer,
    chatId: chatId,
    isAding: isAdingReducer
})

const store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension? window.devToolsExtension(): f => f
));

store.subscribe(() => {
    console.log("Version screen: " + store.getState().screenVersion);
})

module.exports = store;