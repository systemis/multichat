import userMG               from './user.js';
import chatMG               from './chat.js';
import socketMG             from './socket.js';
class cET{
    constructor(props){
        this.props = props;
        console.log(props);
    }
    
    update_leftbar_list(){
        var usersListDom = document.getElementsByClassName('user-item');
        for(var i = 0; i < usersListDom.length; i++){
            usersListDom[i].classList.remove('active');
            if(i === usersListDom.length - 1){
                document.getElementById(this.props.data.id).classList.add('active');
            }
        }
    }

    handling_error(){
        alert(`Have some error, try again please!`);
        return window.location.href = '/home';
    }

    renderHandlerScreen(value){
        document.getElementById('handler-screen').style.display = value;
    }

    changeChatRoomId(chatRoomId){
        const {dispatch} = this.props;
        const screenVersion = this.props.screenVersion; 
        chatMG.acessRom(chatRoomId, (err, result) => {
            if(err) {
                console.log(err);
                return this.handling_error();
            }
            
            dispatch({type: `CHANGE_CHAT_ROOM_ID`, value: chatRoomId});
            dispatch({type: `CHANGE_CHAT_ROOM_INFO`, value: result});
            this.renderHandlerScreen('none');
            if(screenVersion !== 'desktop'){
                dispatch({type: 'CHANGE_INDEX_SHOW_SPM', value: 1});
            }
        })
    }

    click(){
        const {dispatch} = this.props;
        dispatch({type: 'CHANGE_CHAT_ID', value: this.props.data.id});
        dispatch({type: "CHANGE_USER_INFO", value: this.props.data});
        dispatch({type: 'CHANGE_CHAT_USER_NAME', value: this.props.data.name});
        this.renderHandlerScreen('block');
        this.update_leftbar_list();
        

        chatMG.checkChatRoomId(this.props.clientId + this.props.data.id, (err, bool) => {
            if(bool) { return this.changeChatRoomId(this.props.clientId + this.props.data.id); }
            
            chatMG.checkChatRoomId(this.props.data.id + this.props.clientId, (er, bo) => {
                if(er) { return this.handling_error(); }
                if(bo) { return this.changeChatRoomId(this.props.data.id + this.props.clientId);} 

                // Add new room in database 
                const chatRoomId = this.props.clientId + this.props.data.id;
                chatMG.newRoom  (this.props.clientId, this.props.data.id);
                userMG.addFriend(this.props.clientId, this.props.data.id);

                dispatch({type: `CHANGE_CHAT_ROOM_ID`, value: chatRoomId});
                dispatch({
                    type: `CHANGE_CHAT_ROOM_INFO`, 
                    value: {id: chatRoomId, 
                            user: [this.props.clientId, this.props.data.id], 
                            messages: []
                        }
                    }
                );

                this.renderHandlerScreen('none');
                if(this.props.screenVersion !== 'desktop'){
                    this.props.dispatch({type: 'CHANGE_INDEX_SHOW_SPM', value: 1});
                }
            })
        })
    }
}

export default cET;