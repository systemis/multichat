import React, { Component } from 'react';
import {connect}            from 'react-redux';
import socketMG             from '../../js/socket.js';

class NotificationComponent extends Component {
    constructor(props){
        super(props);
        this.state = {notifications: []}
    }

    notificationsList(){
        var notificationsDomList = [];
        var notifications        = this.props.notifications;

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
        const notifications = this.notificationsList();
        return (
            <div className="dropdown" id="show-notifications-group">
                <span
                    className="show-item-notifi dropdown-toggle"
                    data-toggle="dropdown"> 
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

    shouldComponentUpdate(nextProps, nextState) {
        console.log('change');
        const {dispatch} = this.props;
        const sefl      = this;
        if(nextProps.clientId && nextProps !== this.props.clientId){
            socketMG.receiveNotifi(this.props.clientId, notification => {
                var notifications = sefl.props.notifications;
                notifications.push(notification);
                
                sefl.setState({notifications: notifications});
                dispatch({type: 'CHANGE_NOTIFICATIONS', value: notifications});
            })     
        }

        if(nextProps.notifications && JSON.stringify(nextProps.notifications) !== JSON.stringify(this.props.notifications)){
            this.setState({notifications: nextProps.notifications});
        }

        this.render();
        return true;
    }
}

export default connect(state => {
    return {
        clientId: state.clientId, 
        notifications: state.notifications
    }
})(NotificationComponent);