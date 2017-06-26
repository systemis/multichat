import React, { Component } from 'react';

class AMessageItem extends Component {
    render() {
        return (
            <div className={`message-item ${this.props.className.messageName}`}>
                <div className="show-user-avatar">
                    <img 
                        className={this.props.showAvatar} 
                        src={this.props.avatar} 
                        alt="Send avatar" />
                </div>
                <div className="show-message-value">
                    <p> {this.props.message} </p>
                </div>
            </div>
        );
    }
}

export default AMessageItem;