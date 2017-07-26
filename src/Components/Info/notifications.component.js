import React, { Component } from 'react';
import {connect}            from 'react-redux';
import NotificationItem     from './notification.item.js';
import socketMG             from '../../js/socket.js';
import cET                  from '../../js/accessRoomEvent.js';

var _index = 0;
class NotificationComponent extends Component {
    constructor(props){
        super(props);
        this.state = {notifications: []}
    }

    // Receive new notification 
    receiveNotifi(){
        if(!this.props.clientId || _index !== 0) return;

        ++ _index;
        const sefl       = this;
        const {dispatch} = this.props;
        const clientId   = this.props.clientId;

        socketMG.receiveNotifi(clientId, notification => {
            var notifications = [...sefl.props.notifications];
            notifications.push(notification);
            dispatch({type: 'CHANGE_NOTIFICATIONS', value: notifications});
        })
    }

    notificationsList(notifications){
        var notificationsDomList = [];

        if(!notifications) return [];
        if(notifications.length <= 0) return [];
    
        for(var i = notifications.length - 1; i >=0; i--){
            const propsCustom = {
                dispatch: this.props.dispatch,
                clientId: this.props.clientId,
                data: {
                    id: notifications[i].message.sendId,
                    name: notifications[i].message.name
                }
            }

            const notifiDom = (
                <li onClick={() => {
                    new cET(propsCustom).click();
                }}>
                    <div className="row">
                        <div className="col-md-3 col-sm-3 sol-xs-3 show-photo">
                            <img alt="Show pic" src={notifications[i].message.sendAvatar} />
                        </div>
                        <div className="col-md-9 col-sm-9 sol-xs-9 show-message">
                            <p> {notifications[i].message.name} </p>
                            <p> {notifications[i].message.message} </p>
                        </div>                    
                    </div>
                </li>
            )

            notificationsDomList.push(notifiDom);
            if(i === 0){
                return notificationsDomList;
            }
        }
    }

    render() {
        this.receiveNotifi();
        const notifications  = this.notificationsList(this.props.notifications);
        const lengthNotifis  = notifications.length;
        const quantumOfNoEle = () => {
            if(lengthNotifis > 0){
                return (
                    <span className="show-count"> 
                        {lengthNotifis.toString()}
                    </span>
                )
            }
            return ;}
        
        
        return (
            <div 
                className={`dropdown `} 
                id="show-notifications-group">
                <span
                    className="show-item-notifi dropdown-toggle"
                    data-toggle="dropdown"> 
                        <span className="fa fa-bell">
                            {quantumOfNoEle()}
                        </span> 
                </span>
                <ul className="dropdown-menu">
                    {notifications.map(item => {return item})}
                </ul>
            </div>
        );
    }
}

export default connect(state => {
    return {
        clientId: state.clientId, 
        notifications: state.notifications
    }
})(NotificationComponent);