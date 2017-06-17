var redux = require('redux');

const defaultState = {
    versionScreen: 'desktop',
    isAding: false
}

const screenVersionReducer = (state = 'desktop', action) => {
    switch(action.type){
        case 'change version screen':
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

// const reducer = (state = defaultState, action) => {
//     switch(action.type){
//         case 'change version screen':
//             return {...state, versionScreen: action.value};
//         default: 
//             break;
//     }

//     return state;
// }


const reducer = redux.combineReducers({
    versionScreen: screenVersionReducer,
    isAding: isAdingReducer
})

const store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension? window.devToolsExtension(): f => f
));

store.subscribe(() => {
    console.log("Version screen: " + store.getState().versionScreen);
})

module.exports = store;