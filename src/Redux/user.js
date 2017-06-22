const userInfoState    = {}
const usersList        = [];

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

module.exports = {userInfoReducer: userInfoReducer, userListReducer: userListReducer};