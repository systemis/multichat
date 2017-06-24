import React, { Component } from 'react';
import {connect}            from 'react-redux';
import chatSocket           from '../../js/chat.js';
import './Style/chat-group-style.css';

const AMessage = (props) => {
    return (
        <p>
            {props.text}
        </p>
    )
}

class ChatGroup extends Component {
    constructor(props) {
        super(props);
    }

    showMessages(){
        if(this.props.chatRoomInfo.users){
            const messages = this.props.chatRoomInfo.messages;
            const dom = [];
            messages.map((message, index) => {
                console.log(message);

                dom.push((<p key={index}>{ message.message }</p>));

                if(index === messages.length - 1){
                    console.log(dom);

                    return dom; 
                }
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
            message: message
        }

        chatSocket.sendMessage(this.props.chatRoomId, aMessage);
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
    }

    render() {
        // Receive message
        const list = this.showMessages();
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
                        list.map((r, index) => {
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
        chatRoomId: state.chatRoomId, 
        chatRoomInfo: state.chatRoomInfo,
        chatId: state.chatId,
        chatUserName: state.chatUserName
    }
})(ChatGroup);