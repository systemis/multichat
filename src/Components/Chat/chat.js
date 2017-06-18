import React, { Component } from 'react';
import {connect}            from 'react-redux';
import './Style/chat-group-style.css';

class ChatGroup extends Component {
    componentWillMount() {
        console.log(this.props);
        console.log("Version:" + this.props.screenVersion);
    }

    render() {
        const className = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'desktop';
            }
            return "";            
        }

        return (
            <div className={className()} id="chat-group">
                {this.props.screenVersion}
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps);

        return true;        
    }
}

export default connect((state) => {
    return {screenVersion: state.screenVersion};
})(ChatGroup);