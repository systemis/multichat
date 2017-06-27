import React, { Component } from 'react';
import MessageItem          from './message-item.js'
import {connect}            from 'react-redux';
import chatSocket           from '../../js/chat.js';
import './Style/chat-group-style.css';

class ChatGroup extends Component {
    constructor(props) {
        super(props);
    }
    
    accessRoom(chatId){
        var {dispatch} = this.props;
        chatSocket.acessRom(chatId, (err, result) => {
            console.log("Chat data: " + result);
            if(!err){
                dispatch({type: `CHANGE_CHAT_ROOM_INFO`, value: result});
            }
        })
    }

    showMessages(){
        if(this.props.chatRoomInfo.users){
            const messages = this.props.chatRoomInfo.messages;
            const dom = [];
            messages.map((message, index) => {
                console.log(message);

                var className = {
                    messageName: '',
                    showAvatar: ''
                };

                if(message.sendId === this.props.clientId){
                    className.messageName = 'right';
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
        const messageField = document.getElementById('input-message');
        const message      = messageField.value;
        const aMessage     = {
            sendId: this.props.clientId,
            sendAvatar: this.props.clientInfo.avatar,
            message: message
        }

        chatSocket.sendMessage(this.props.chatRoomId, aMessage);
        messageField.value = "";
    }

    receiveMessage(){
        var {dispatch} = this.props;
        if(this.props.chatRoomId){
            chatSocket.receiveMessage(this.props.chatRoomId, (data) => {
                dispatch({type: `CHANGE_CHAT_ROOM_INFO`, value: data});
            })        
        }
    }

    componentWillMount() {
        if(window.location.href.indexOf('/chat/') > 0 && this.props.screenVersion !== 'desktop'){
            const {dispatch} = this.props;
            const roomId     = this.props.match.params.roomId;
            if(typeof parseInt(roomId) === `number`){
                console.log(`Room id is ${roomId}`);
                dispatch({type: `CHANGE_CHAT_ROOM_ID`, value: roomId});
                this.accessRoom(roomId);
            }
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
                    {console.log(this.props.chatUserName)}
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
                <div className="show-message">
                    {
                        this.showMessages().map((r, index) => {
                            return r;
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

        return true;        
    }
}

export default connect((state) => {
    return {
        screenVersion: state.screenVersion, 
        clientId: state.clientId, 
        clientInfo: state.clientInfo, 
        chatRoomId: state.chatRoomId, 
        chatRoomInfo: state.chatRoomInfo,
        chatId: state.chatId,
        chatUserName: state.chatUserName
    }
})(ChatGroup);