import React, { Component } from 'react';
import {connect}            from 'react-redux';

class NotificationComponent extends Component {
    render() {
        return (
            <div className="dropdown">
                <span
                    className="show-item-notifi dropdown-toggle"
                    data-toggle="dropdown"> 
                        <i className="fa fa-bell" /> 
                </span>
                <ul className="dropdown-menu">
                    <li><a href="#">HTML</a></li>
                </ul>
            </div>
        );
    }
}

export default connect((state => {
    return{
        clientId  : state.clientId,
        clientInfo: state.clientInfo
    }
})(NotificationComponent));