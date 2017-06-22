const defaultState    = {}
const userInfoReducer = (state = defaultState, action) => {
    switch(action.type){
        case "CHANGE_USER_INFO":
            console.log("Change user info ");
            return action.value;
        default: 
            return state;
    }
}

module.exports = userInfoReducer;