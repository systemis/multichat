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
        const message = messageField.value;

        chatSocket.sendMessage({
            sendId: this.props.clientId, 
            receiveId: this.props.chatId, 
            message: message
        });
    }

    componentWillMount() {
    }

    render() {
        chatSocket.receiveMessage(this.props.clientId, (message) => {
            console.log(`New message from id: ${message.sendId} Message: ${message.message}`);
        })        
        
        // Set class name to custom ui with desktop version and mobile version .
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
        chatId: state.chatId,
        chatUserName: state.chatUserName
    }
})(ChatGroup);