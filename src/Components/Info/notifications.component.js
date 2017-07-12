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

    resetAllNotifications(){
        // this.props.dispatch({type: 'CHANGE_NOTIFICATIONS', value: []})
    }

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
            const clickItemEvent = new cET({
                dispatch: this.props.dispatch,
                clientId: this.props.clientId,
                data: {
                    id: notifications[i].message.sendId,
                    name: notifications[i].message.name
                }
            })

            const notifiDom = (
                <li onClick={() => clickItemEvent.click()}>
                    <div className="row">
                        <div className="col-md-3 col-sm-3 sol-xs-3 show-photo">
                            <img alt="Show pic" src={notifications[i].message.sendAvatar} />
                        </div>
                        <div className="col-md-3 col-sm-3 sol-xs-3 show-message">
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
        console.log(this.props.notifications);
        this.receiveNotifi();
        const notifications  = this.notificationsList(this.props.notifications);
        const lengthNotifis  = notifications.length;
        const groupClassName = () => {
            if(lengthNotifis > 0){
                return 'active';
            }
            return ' ';}
        const quantumOfNoEle = () => {
            if(lengthNotifis > 0){
                return (
                    <span style={{position: 'relative', top: '-10px', color: 'red'}}> 
                        {lengthNotifis.toString()}
                    </span>
                )
            }
            return ;}
        
        
        return (
            <div 
                className={`dropdown ${groupClassName}`} 
                id="show-notifications-group">
                <span
                    className="show-item-notifi dropdown-toggle"
                    data-toggle="dropdown"
                    onClick={() => this.resetAllNotifications()}> 
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