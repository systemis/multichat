import React, { Component } from 'react';

class AMessageItem extends Component {
    render() {
        const rdLabel = (rd) => {
            if(rd){
                return (
                    <span
                        className="fa fa-check" 
                        aria-hidden="true"
                        style={{float: 'right', fontSize: '33px', color: 'green'}}></span>
                )
            }
            
            return;
        }

        return (
            <div className={`message-item row ${this.props.className.messageName}`}>
                <div className={`show-user-avatar`}>
                    <img 
                        className={this.props.className.showAvatar} 
                        src={this.props.avatar} 
                        alt="Send avatar" />
                </div>
                <div className="show-message-value">
                    <p className="value"> {this.props.message} </p>
                    {rdLabel(this.props.className.rd)}
                </div>
            </div>
        );
    }
}

export default AMessageItem;