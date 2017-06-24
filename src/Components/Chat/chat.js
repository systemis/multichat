import React, { Component } from 'react';
import {connect}            from 'react-redux';
import chatSocket           from '../../js/chat.js';
import './Style/chat-group-style.css';

class ChatGroup extends Component {
    constructor(props) {
        super(props);
    }

    // Back-end api .
    sendMessage(){
        const messageField = document.getElementById('input-message');
        const message      = messageField.value;
        const aMessage     = {
            sendId: this.props.clientId,
            message: message
        }

        chatSocket.sendMessage(this.props.chatRoomId, aMessage);
    }

    receiveMessage(){
        if(this.props.chatRoomId){
            chatSocket.receiveMessage(this.props.chatRoomId, (message) => {
                console.log(`New message from id: ${message}`);
            })        
        }
    }

    componentWillMount() {
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
        chatRoomId: state.chatRoomId, 
        chatId: state.chatId,
        chatUserName: state.chatUserName
    }
})(ChatGroup);