import React, { Component } from 'react';
import {connect}            from 'react-redux';
import userMG               from '../../js/user.js';
import chatMG               from '../../js/chat.js';
import socketMG             from '../../js/socket.js';

class UserItem extends Component {
    constructor(props){
        super(props);
        this.state = {isOnline: "none-online"}
    }

    accessRoom(chatId){
        const {dispatch} = this.props;
        chatMG.acessRom(chatId, (err, result) => {
            if(!err){
                dispatch({type: `CHANGE_CHAT_ROOM_ID`, value: chatId});
                dispatch({type: `CHANGE_CHAT_ROOM_INFO`, value: result});
            }else{
                alert(`Bạn không được phép truy cập, vui kiểm tra lại sau !`);
                window.location.href = '/';
            }
        })
    }

    changeChatRoomId(chatRoomId){
        const {dispatch}    = this.props;
        const screenVersion = this.props.screenVersion; 

        if(screenVersion === `desktop`){
            this.accessRoom(chatRoomId);
        }else{
            window.location.href = `/chat/${chatRoomId}`;
        }
    }

    clickItemEvent(){
        const {dispatch} = this.props;

        dispatch({type: 'CHANGE_CHAT_ID', value: this.props.data.id});
        dispatch({type: "CHANGE_USER_INFO", value: this.props.data});
        dispatch({type: 'CHANGE_CHAT_USER_NAME', value: this.props.data.name});

        console.log(this.props.clientId + this.props.data.id);
        console.log(this.props.data.id);
        chatMG.checkChatRoomId(this.props.clientId + this.props.data.id, (err, bool) => {
            if(err){
                alert(`Have some error, try again please!`);
                return window.location.href = '/home';
            }

            if(bool){
                return this.changeChatRoomId(this.props.clientId + this.props.data.id);
            }
            
            chatMG.checkChatRoomId(this.props.data.id + this.props.clientId, (er, bo) => {
                if(er){
                    alert(`Have some error, try again please!`);
                    return window.location.href = '/home';
                }

                if(bo){
                    return this.changeChatRoomId(this.props.data.id + this.props.clientId);
                }

                // Add new room in database 
                chatMG.newRoom  (this.props.clientId, this.props.data.id);
                userMG.addFriend(this.props.clientId, this.props.data.id);

                const chatRoomId = this.props.clientId + this.props.data.id;
                if(this.props.screenVersion === 'desktop'){
                    dispatch({type: `CHANGE_CHAT_ROOM_ID`, value: chatRoomId});
                }else{
                    window.location.href = `/chat/${chatRoomId}`
                }
            })
        })
    }

    render() {
        return (
            <div 
                className="user-item row" 
                onClick={() => this.clickItemEvent()}>
                <div className="show-image">
                    <div className="child">
                        <img 
                            className={this.state.isOnline}
                            src={this.props.data.avatar}/>
                    </div>
                </div>
                <div className="show-user-info">
                    <p className="show-name">{this.props.data.name}</p>
                    <p className="status">{this.props.data.status}</p>
                </div>
            </div>
        );
    }

    
    componentWillMount() {
        const update_online_status = (isOnline) => {
            if(isOnline){
                return this.setState({isOnline: 'online'});
            }
            return this.setState({isOnline: 'none-online'});
        }

        userMG.checkUserOnline(this.props.data.id, isOnline => {
            console.log(`Check user online client: ${isOnline}`);
            update_online_status(isOnline);
        })        

        socketMG.checkOnline(this.props.data.id, isOnline => {
            console.log(`Check user online client socket: ${isOnline}`);
            update_online_status(isOnline);
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
}

export default connect((state) => {
    return {
        screenVersion: state.screenVersion, 
        clientId: state.clientId
}})(UserItem);