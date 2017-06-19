import React, { Component } from 'react';
import UserItem             from './user-item.js';

class UsersView extends Component {
    render() {
        return (
            <div className="show-users-view">
                Show users view 
                {this.props.data.map((item, index) => {
                    return <UserItem key={index} data={item} />
                })}
            </div>
        );
    }
}

export default UsersView;