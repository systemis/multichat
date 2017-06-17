import React, { Component } from 'react';
import {connect}            from 'react-redux';

class ChatGroup extends Component {
    componentWillMount() {
        console.log("Version:" + this.props.screenVersion);
    }

    render() {
        const className = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'chat-group col-md-6'
            }else{
                return 'chat-group'
            }
        }

        return (
            <div className={className()}>
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