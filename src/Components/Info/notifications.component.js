import React, { Component } from 'react';
import {connect}            from 'react-redux';
import socketMG             from '../../js/socket.js';

var _index = 0;
class NotificationComponent extends Component {
    constructor(props){
        super(props);
        this.state = {notifications: []}
    }

    resetAllNotifications(){
        // this.props.dispatch({type: 'CHANGE_NOTIFICATIONS', value: []})
    }

    notificationsList(notifications){
        var notificationsDomList = [];

        if(!notifications) return [];
        if(notifications.length <= 0) return [];
    
        for(var i = 0; i < notifications.length; i++){
            const notifiDom = (
                <li>
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
            if(i === notifications.length - 1){
                return notificationsDomList;
            }
        }
    }

    render() {
        console.log(this.props.notifications);
        const {dispatch}     = this.props;
        const sefl           = this;
        const notifications  = this.notificationsList(this.props.notifications);
        var   groupClassName = '';
        if(notifications.length > 0) groupClassName = 'active';
        if(this.props.clientId && _index == 0){
            _index ++;
            socketMG.receiveNotifi(this.props.clientId, notification => {
                console.log('new notifications');
                var notifications = sefl.props.notifications;
                notifications.push(notification);
                dispatch({type: 'CHANGE_NOTIFICATIONS', value: notifications});
                sefl.setState({notifications: notifications});
            })     
        }
        
        return (
            <div 
                className={`dropdown ${groupClassName}`} 
                id="show-notifications-group">
                <span
                    className="show-item-notifi dropdown-toggle"
                    data-toggle="dropdown"
                    onClick={() => this.resetAllNotifications()}> 
                        <i className="fa fa-bell" /> 
                </span>
                <ul className="dropdown-menu">
                    {notifications.map(item => {
                        return item;
                    })}
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