import React, { Component } from 'react';
import {connect}            from 'react-redux';
import userMG               from '../../js/user.js';
import chatMG               from '../../js/chat.js';

class UserItem extends Component {
    clickItemEvent(){
        var {dispatch} = this.props;
        console.log(this.props.data.name);

        dispatch({type: "CHANGE_USER_INFO", value: this.props.data});
        dispatch({type: 'CHANGE_CHAT_USER_NAME', value: this.props.data.name});
        dispatch({type: 'CHANGE_CHAT_ID', value: this.props.data.id});

        chatMG.checkChatRoomId(this.props.clientId.toString() + this.props.data.id.toString(), (err, bool) => {
            if(!err){
                if(bool){
                    dispatch({type: 'CHANGE_CHAT_ROOM_ID', value: this.props.clientId.toString() + this.props.data.id.toString()});
                }else{
                    dispatch({type: 'CHANGE_CHAT_ROOM_ID', value: this.props.data.id.toString() + this.props.clientId.toString()});
                    chatMG.newRoom(this.props.data.id.toString(), this.props.clientId.toString());
                }
            }else{
                alert("Co loi xay ra");
                window.location.href = '/logout';
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