import React, { Component } from 'react';
import {connect}            from 'react-redux';
import socketMG             from '../../js/socket.js';

class NotificationComponent extends Component {
    constructor(props){
        super(props);
        this.state = {notifications: []};
    }

    notificationsList(){
        var notificationsDomList = [];
        var notifications        = this.state.notifications;
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
        const notifications = this.notificationsList();
        return (
            <div className="dropdown">
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
        const {dispatch} = this.props;
        if(nextProps.clientId !== this.props.clientId){
            socketMG.removeNotifiListner(this.props.clientId);
            socketMG.receiveNotifi(nextProps.clientId, notification => {
                var notifications = this.state.notifications;
                notifications.push(notification);

                dispatch({type: 'CHANGE_NOTIFICATIONS', value: notifications});
            })
        }        

        if(JSON.stringify(nextProps.clientInfo.notifications) !== JSON.stringify(this.props.clientInfo.notifications)){
            console.log(`New notifications was updated `);
            this.setState({notifications: nextProps.clientInfo.notifications});
        }

        this.render();
        return true;
    }
}

export default connect(state => {
    return{
        clientId  : state.clientId,
        clientInfo: state.clientInfo
    }
})(NotificationComponent)