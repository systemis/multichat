import React, { Component } from 'react';
import $                    from 'jquery';
import {connect}            from 'react-redux';
import userMG               from '../../js/user.js';
import socketMG             from '../../js/socket.js';
import cET                  from '../../js/accessRoomEvent.js';


class UserItem extends Component {
    constructor(props){
        super(props);
        this.state = {isOnline: "none-online"};
        this.clickItemEvent = new cET(props);
    }

    componentWillMount() {
        const update_online_status = (isOnline) => {
            if(isOnline){
                return this.setState({isOnline: 'online'});
            }
            return this.setState({isOnline: 'none-online'});
        }

        userMG.checkUserOnline(this.props.data.id, isOnline => {
            update_online_status(isOnline);
        })        

        socketMG.checkOnline(this.props.data.id, isOnline => {
            update_online_status(isOnline);
        })
    }

    render() {
        return (
            <div 
                className="user-item row"
                id={this.props.data.id} 
                onClick={() => this.clickItemEvent.click()}>
                <div className="show-image">
                    <div className="child">
                        <p>
                            <img 
                                className={this.state.isOnline}
                                src={this.props.data.avatar}/>
                        </p>
                    </div>
                </div>
                <div className="show-user-info">
                    <p className="show-name">{this.props.data.name}</p>
                    <p className="status">{this.props.data.status}</p>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        screenVersion: state.screenVersion, 
        clientId: state.clientId
}})(UserItem);