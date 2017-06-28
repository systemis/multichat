const clientIdReducer = (state = -1, action) => {
    switch(action.type){
        case 'CHANGE_CLIENT_ID':
            return action.value;
        default: 
            return state;
    }
}

const clientInfoReducer = (state = "", action) => {
    switch(action.type){
        case 'CHANGE_CLIENT_INFO':
            return action.value;
        default: 
            return state;
    }
}


const userInfoReducer = (state = {}, action) => {
    switch(action.type){
        case "CHANGE_USER_INFO":
            return action.value;
        default: 
            return state;
    }
}

const usersListReducer = (state = [], action) => {
    switch(action.type){
        case `CHANGE_USERS_LIST`:
            return action.value;
        default: 
            return state;
    }
}

export default {
    clientIdReducer   : clientIdReducer, 
    clientInfoReducer : clientInfoReducer, 
    userInfoReducer   : userInfoReducer, 
    usersListReducer  : usersListReducer
};