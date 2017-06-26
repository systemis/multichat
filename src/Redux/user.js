const userInfoState    = {}
const usersList        = [];

const clientIdReducer = (state = -1, action) => {
    switch(action.type){
        case 'CHANGE_CLIENT_ID':
            console.log(`Change client id ${action.value}`)
            return action.value;
        default: 
            return state;
    }
}

const clientInfoReducer = (state = "", action) => {
    switch(action.type){
        case 'CHANGE_CLIENT_INFO':
            console.log(`Change client info ${action.value}`)
            return action.value;
        default: 
            return state;
    }
}


const userInfoReducer = (state = userInfoState, action) => {
    switch(action.type){
        case "CHANGE_USER_INFO":
            return action.value;
        default: 
            return state;
    }
}

const userListReducer = (state = usersList, action) => {
    switch(action.type){
        case `CHANGE_USER_LIST`:
            return action.value;
        default: 
            return state;
    }
}

module.exports = {
    clientIdReducer: clientIdReducer, 
    clientInfoReducer: clientInfoReducer, 
    userInfoReducer: userInfoReducer, 
    userListReducer: userListReducer
};