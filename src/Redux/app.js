const indexShowScreenPageMobileReducer = (state = 0, action) => {
    switch(action.type){
        case 'CHANGE_INDEX_SHOW_SPM':
            return action.value;
        default:
            return state;
    }
}

export default {
    indexShowScreenPageMobileReducer: indexShowScreenPageMobileReducer
};