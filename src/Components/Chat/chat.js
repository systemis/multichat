import React, { Component } from 'react';
import $                    from 'jquery';
import MessageItem          from './message-item.js'
import {connect}            from 'react-redux';
import chatMG           from '../../js/chat.js';
import './Style/chat-group-style.css';

const scrollMessageGroupToBottom = () => {
    $(document).ready(function(){
        const messagesGroup = document.getElementById('show-messages-group');
        if(messagesGroup){
            messagesGroup.scrollTop = messagesGroup.scrollHeight;
        }
    })
}

class ChatGroup extends Component {
    constructor(props) {
        super(props);
    }
    
    accessRoom(chatRoomId){
        var {dispatch} = this.props;
        chatMG.acessRom(chatRoomId, (err, result) => {
            if(!err){
                dispatch({type: `CHANGE_CHAT_ROOM_ID`  , value: chatRoomId});
                dispatch({type: `CHANGE_CHAT_ROOM_INFO`, value: result});
            }else{
                alert(`Ban khong duoc phep `);
                window.location.href = '/';
            }
        })
    }

    showMessages(){
        if(this.props.chatRoomInfo.users){
            const messages = this.props.chatRoomInfo.messages;
            const dom = [];
            messages.map((message, index) => {
                var className = {
                    messageName: '',
                    showAvatarGroup: '',
                    showAvatar: ''
                };

                if(message.sendId === this.props.clientId){
                    className.messageName     = 'right';
                }

                if(index !== 0){
                    if(message.sendId === messages[index - 1].sendId){
                        className.showAvatar = 'hiden';
                    }
                }

                dom.push((
                    <MessageItem 
                        key={index} 
                        message={message.message} 
                        avatar={message.sendAvatar} 
                        className={className}/>
                ));
            })

            return dom;
        }else{
            return [];
        }
    }

    // Back-end api .
    sendMessage(){
        console.log(new Date().toLocaleString());
        const messageField = document.getElementById('input-message');
        const message      = messageField.value;
        const aMessage     = {
            sendId: this.props.clientId,
            sendAvatar: this.props.clientInfo.avatar,
            message: message
        }

        chatMG.sendMessage(this.props.chatRoomId, aMessage);
        messageField.value = "";
    }

    receiveMessage(){
        var {dispatch} = this.props;
        if(this.props.chatRoomId){
            chatMG.receiveMessage(this.props.chatRoomId, (data) => {
                dispatch({type: `CHANGE_CHAT_ROOM_INFO`, value: data});
            })        
        }
    }

    render() {
        // Receive message
        this.receiveMessage();
        const className = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'desktop';
            }

            return "";}

        return (
            <div className={className()} id="chat-group">
                <div className="header-bar">
                    <p className="chat-group-show-name">
                        {this.props.chatUserName} 
                    </p>
                    <ul className="chat-group-list-tool">
                        <li>
                            <i className="fa fa-phone" aria-hidden="true"></i>
                        </li>
                        <li>
                            <i className="fa fa-video-camera" aria-hidden="true"></i>
                        </li>
                    </ul>
                </div>
                <div 
                    className="show-message"
                    id="show-messages-group">
                    {
                        this.showMessages().map((item, index) => {
                            return item;
                        })
                    }
                </div>
                <div className="group-send-message">
                    <i className="fa fa-paperclip"> </i>
                    <input 
                        type="text"
                        id="input-message"
                        placeholder="Type your message ..." />
                    <i 
                        className="fa fa-paper-plane" 
                        aria-hidden="true"
                        onClick={() => this.sendMessage()}>
                    </i>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.render();
        scrollMessageGroupToBottom();
        chatMG.update();

        return true;        
    }

    componentDidMount() {
        scrollMessageGroupToBottom();

        if(window.location.href.indexOf('/chat/') > 0 && this.props.screenVersion !== 'desktop'){
            const {dispatch} = this.props;
            const roomId     = this.props.match.params.roomId;
            if(typeof parseInt(roomId) === `number`){
                console.log(`Room id is ${roomId}`);
                this.accessRoom(roomId);
            }
        }
    }
}

export default connect((state) => {
    return {
        screenVersion: state.screenVersion, 
        clientId: state.clientId, 
        clientInfo: state.clientInfo, 
        chatRoomId: state.chatRoomId, 
        chatId: state.chatId,
        chatUserName: state.chatUserName,
        chatRoomInfo: state.chatRoomInfo,
    }
})(ChatGroup);