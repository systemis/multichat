import React, { Component } from 'react';
import $                    from 'jquery';
import MessageItem          from './message-item.js'
import {connect}            from 'react-redux';
import chatMG               from '../../js/chat.js';
import sound                from '../../accest/sound.mp3';
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
        this.state = {users: "", messages: ""};

        this.receiveMessage = this.receiveMessage.bind(this);

        this.receiveMessage();
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

    getMessages(){
        const messages = this.props.chatRoomInfo.messages;
        const users    = this.props.chatRoomInfo.users;
        
        if(users && users.length >= 0 && JSON.stringify(users) !== this.state.users) {
            this.setState({messages: messages});
            this.setState({users: JSON.stringify(users)});
        };
    }

    showMessages(){
        var messages = this.state.messages;
        var dom      = [];

        if(messages){
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
        const {dispatch}   = this.props;
        const messageField = document.getElementById('input-message');
        const message      = messageField.value;
        const aMessage     = {
            sendId: this.props.clientId,
            sendAvatar: this.props.clientInfo.avatar,
            message: message
        }
        
        if(message) {
            chatMG.sendMessage(this.props.chatRoomId, aMessage);
            messageField.value = "";

            if(this.state.messages instanceof Array){
                console.log('New message at client not socket');
                const newMessages = this.state.messages;
                newMessages.push(aMessage);
                this.setState({messages: newMessages});
            }
        }
    }

    receiveMessage(chatRoomId){
        var {dispatch} = this.props;
        chatMG.receiveMessage(chatRoomId, (data) => {
            dispatch({type: `CHANGE_CHAT_ROOM_INFO`, value: data});
            var aNMS = data.messages[data.messages.length - 1];
            var nMSs = this.state.messages;
            nMSs.push(aNMS);
            
            
            // play sound 
            if(data.messages[data.messages.length - 1].sendId !== this.props.clientId){
                this.setState({messages: data.messages});
                 new Audio(sound).play();
            }
        })        
    }

    render() {
        // Receive message
        this.getMessages();
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
                    <form id="message-field-send" style={{width: '100%', height: '100%'}}>
                        <i className="fa fa-paperclip"> </i>
                        <input 
                            type="text"
                            id="input-message"
                            placeholder="Type your message ..." />
                        <span
                            className="fa fa-paper-plane" 
                            aria-hidden="true"
                            onClick={() => this.sendMessage()}>
                        </span>
                    </form>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.chatRoomId !== this.props.chatRoomId){
            this.receiveMessage(nextProps.chatRoomId);
        }
        
        this.render();
        scrollMessageGroupToBottom();
        chatMG.update();

        return true;        
    }

    componentDidMount() {
        this.getMessages();
        scrollMessageGroupToBottom();

        document.getElementById("message-field-send").addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        })

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