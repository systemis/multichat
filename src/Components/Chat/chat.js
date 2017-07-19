import React, { Component } from 'react';
import MessageItem          from './message-item.js'
import socketMG             from '../../js/socket.js';
import {connect}            from 'react-redux';
import $                    from 'jquery';
import chatMG               from '../../js/chat.js';
import userMG               from '../../js/user.js';
import sound                from '../../accest/sound.mp3';
import './Style/chat-group-style.css';

const scrollMessageGroupToBottom = () => {
    $(document).ready(() => {
        $('#show-messages-group').scrollTop($('#show-messages-group')[0].scrollHeight)
    });
}

class ChatGroup extends Component {
    constructor(props) {
        super(props);
        this.state  = {users: [], messages: []};
    }
    
    accessRoom(chatRoomId){
        var {dispatch} = this.props;
        chatMG.acessRom(chatRoomId, (err, result) => {
            if(!err){
                dispatch({type: `CHANGE_CHAT_ROOM_ID`  , value: chatRoomId});
                dispatch({type: `CHANGE_CHAT_ROOM_INFO`, value: result});
            }else{
                alert(`Have something wrong, please try again !`);
                window.location.href = '/';
            }
        })
    }

    rvNotifi_M(userId, sendId){
        var {dispatch}    = this.props; 
        var notifications = [...this.props.notifications];
        var updateNotifis = [];
        if(notifications.length <= 0) return;
        
        for(var i = 0; i < notifications.length; i++){
            if(notifications[i].message.sendId !== sendId){
                updateNotifis.push(notifications[i]);
            }

            if(i === notifications.length - 1){
                userMG.rvNotifi_M(userId, sendId);
                this.props.dispatch({type: 'CHANGE_NOTIFICATIONS', value: updateNotifis});
            }
        }
    }

    getMessages(){
        var messages = this.props.chatRoomInfo.messages;
        var users    = this.props.chatRoomInfo.users;

        if(users && JSON.stringify(users) !== this.state.users) {
            if(messages.length > 0){
                this.rvNotifi_M(this.props.clientId, this.props.chatId);
                if(!messages[messages.length - 1].rd){
                    messages[messages.length - 1].rd = true;
                    chatMG.sendRequestRD(this.props.chatRoomId);
                }
            }

            this.setState({messages: messages});
            this.setState({users: JSON.stringify(users)});
        };
    }

    showMessages(){
        var messages        = this.state.messages;
        var messagesListDom = [];

        if(messages){
            messages.map((message, index) => {
                var className = {
                    messageName: '',
                    showAvatar: '',
                    rd: '',
                };

                if(message.sendId === this.props.clientId){
                    className.messageName     = 'right';
                    if(index === messages.length - 1 && message.rd){
                        className.rd = 'show-rd';
                    }
                }

                if(index !== 0){
                    if(message.sendId === messages[index - 1].sendId){
                        className.showAvatar = 'hiden';
                    }
                }

                messagesListDom.push((
                    <MessageItem 
                        key={index} 
                        message={message.message} 
                        avatar={message.sendAvatar} 
                        className={className}/>
                ));
            })

            return messagesListDom;
        }else{
            return [];
        }
    }

    setActionForChatForm(){
        document.getElementById("message-field-send").addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        })
    }

    // Back-end api .
    sendMessage(){
        const sefl         = this;
        const {dispatch}   = this.props;
        const messageField = document.getElementById('input-message');
        const message      = messageField.value;
        const aMessage     = {
            sendId: this.props.clientId,
            name: this.props.clientInfo.name, 
            sendAvatar: this.props.clientInfo.avatar,
            message: message,
            rd: false
        }
        
        if(message) {
            const newMessages = sefl.state.messages;
            newMessages.push(aMessage);

            sefl.setState({messages: newMessages});
            chatMG.sendMessage(this.props.chatRoomId, aMessage);
            messageField.value = "";
        }
    }

    receiveMessage(chatRoomId){
        var {dispatch} = this.props;
        var sefl       = this;

        chatMG.receiveMessage(chatRoomId, (newMessage) => {
            var nMSs = sefl.state.messages;
            console.log('new message client ')
            
            if(newMessage.sendId !== this.props.clientId){
                newMessage.rd = true;
                nMSs.push(newMessage);
                sefl.setState({messages: nMSs});
                chatMG.sendRequestRD(chatRoomId);
                setTimeout(() => this.rvNotifi_M(this.props.clientId, newMessage.sendId), 2000);
                
                //TODO: play sound 
                new Audio(sound).play();
            }
        })        
    }

    receiveRequesRD(chatRoomId){
        var {dispatch} = this.props;

        chatMG.receiveRequestRD(chatRoomId, value => {
            if(this.state.messages[this.state.messages.length - 1].sendId === this.props.clientId){
                var messagesUD = this.state.messages;
                messagesUD[messagesUD.length - 1].rd = true;
                this.setState({messages: messagesUD});
                console.log('Readed');
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
                <div className="b-group">
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
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.chatRoomId !== this.props.chatRoomId){
            this.receiveMessage(nextProps.chatRoomId);
            this.receiveRequesRD(nextProps.chatRoomId);

            if(this.props.chatRoomId) socketMG.removeListener(this.props.chatRoomId);
        }

        this.render();
        scrollMessageGroupToBottom();
        chatMG.update();
        return true;        
    }

    componentDidMount() {
        scrollMessageGroupToBottom();
        this.setActionForChatForm();
        if(this.props.screenVersion !== 'desktop' && this.props.chatRoomId){
            this.receiveMessage(this.props.chatRoomId);
            this.receiveRequestRD(this.props.chatRoomId);
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
        notifications: state.notifications
    }
})(ChatGroup);