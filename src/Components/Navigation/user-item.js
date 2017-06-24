import React, { Component } from 'react';
import {connect}            from 'react-redux';
import userMG               from '../../js/user.js';
import chatMG               from '../../js/chat.js';

class UserItem extends Component {
    accessRoom(chatId){
        var {dispatch} = this.props;
        chatMG.acessRom(chatId, (err, result) => {
            console.log("Chat data: " + result);
            if(!err){
                dispatch({type: `CHANGE_CHAT_ROOM_INFO`, value: result});
            }
        })
    }

    clickItemEvent(){
        var {dispatch} = this.props;
        console.log(this.props.data.name);

        dispatch({type: "CHANGE_USER_INFO", value: this.props.data});
        dispatch({type: 'CHANGE_CHAT_USER_NAME', value: this.props.data.name});
        dispatch({type: 'CHANGE_CHAT_ID', value: this.props.data.id});

        chatMG.checkChatRoomId(this.props.clientId + this.props.data.id, (err, bool) => {
            if(!err){
                if(!bool){
                    chatMG.checkChatRoomId(this.props.data.id + this.props.clientId, (er, bo) => {
                        if(!er){
                            if(!bo){
                                dispatch({type: 'CHANGE_CHAT_ROOM_ID', value: this.props.clientId + this.props.data.id});
                                chatMG.newRoom(this.props.clientId, this.props.data.id);
                            }else{
                                dispatch({type: 'CHANGE_CHAT_ROOM_ID', value: this.props.data.id + this.props.clientId});
                                this.accessRoom(this.props.data.id + this.props.clientId);
                            }
                        }
                    })
                }else{
                    dispatch({type: 'CHANGE_CHAT_ROOM_ID', value: this.props.clientId + this.props.data.id});
                    this.accessRoom(this.props.clientId + this.props.data.id);
                }
            }
        })
    }

    render() {
        return (
            <div 
                className="user-item row" 
                onClick={() => this.clickItemEvent()}>
                <div className="col-md-3 col-sm-3 col-xs-3 show-image">
                    <div className="child">
                        <img src={this.props.data.avatar} />
                    </div>
                </div>
                <div className="col-md-9 col-sm-9 col-xs-9 show-user-info">
                    <p className="show-name">{this.props.data.name}</p>
                    <p className="status">{this.props.data.status}</p>
                </div>
            </div>
        );
    }
}

export default connect((state) => {return {clientId: state.clientId}})(UserItem);