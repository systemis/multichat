import React, { Component } from 'react';

class UserItem extends Component {
    render() {
        return (
            <div className="user-item row">
                <div className="col-md-3 col-sm-3 col-xs-3 show-image">
                    <img src={this.props.data.avatar} />
                </div>
                <div className="col-md-9 col-sm-9 col-xs-9 show-user-info">
                    <p className="show-name">{this.props.data.name}</p>
                    <p className="status">{this.props.data.status}</p>
                </div>
            </div>
        );
    }
}

export default UserItem;