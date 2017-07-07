import React, { Component } from 'react';
import MessageItem          from './message-item.js'
import {connect}            from 'react-redux';
import $                    from 'jquery';
import chatMG               from '../../js/chat.js';
import sound                from '../../accest/sound.mp3';
import './Style/chat-group-style.css';

const scrollMessageGroupToBottom = () => {
    $(document).ready(() => {
        // if(document.getElementById("#show-messages-group")){
            $('#show-messages-group').scrollTop($('#show-messages-group')[0].scrollHeight)
        // }
    });
}

class ChatGroup extends Component {
    constructor(props) {
        super(props);
        this.state       = {users: [], messages: []};
        // this.sendMessage = this.sendMessage.bind(this);
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

    getMessages(){
        const messages = this.props.chatRoomInfo.messages;
        const users    = this.props.chatRoomInfo.users;

        if(JSON.stringify(users) !== this.state.users) {
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
            this.sendMessage().bind(this);
        })
    }

    // Back-end api .
    sendMessage(){
        const {dispatch}   = this.props;
        const messageField = document.getElementById('input-message');
        const message      = messageField.value;
        const aMessage     = {
            sendId: this.props.clientId,
            sendAvatar: this.props.clientInfo.avatar,
            message: message,
            rd: false
        }
        
        if(message) {
            const newMessages = this.state.messages;
            newMessages.push(aMessage);

            this.setState({messages: newMessages});
            chatMG.sendMessage(this.props.chatRoomId, aMessage);
            messageField.value = "";
        }
    }

    receiveMessage(chatRoomId){
        var {dispatch} = this.props;
        var sefl       = this;

        console.log(chatRoomId);
        chatMG.receiveMessage(chatRoomId, (newMessage) => {
            var nMSs = sefl.state.messages;
            console.log('new message client ')
            // play sound 
            if(newMessage.sendId !== this.props.clientId){
                newMessage.rd = true;
                nMSs.push(newMessage);
                sefl.setState({messages: nMSs});

                chatMG.sendRequestRD(chatRoomId);
                new Audio(sound).play();
            }
        })        
    }

    receiveRequesRD(chatRoomId){
        var {dispatch} = this.props;

        chatMG.receiveRequestRD(chatRoomId, value => {
            if(this.state.messages[this.state.messages.length - 1].sendId === this.props.clientId){
                alert('Readed');
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
                        <i className="fa fa-paperclip"> </i>
                        <input 
                            type="text"
                            id="input-message"
                            placeholder="Type your message ..." />
                        <span
                            className="fa fa-paper-plane" 
                            aria-hidden="true"
                            onClick={() => this.sendMessage().bind(this)}>
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
    }
})(ChatGroup);