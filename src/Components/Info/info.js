import React, { Component } from 'react';
import {connect}            from 'react-redux';
import './Style/info-group-style.css';

class InfoGroup extends Component {
    render() {
        const className = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'desktop';
            }
        }
        return (
            <div className={className()} id="info-group">
                {this.props.screenVersion}
            </div>
        );
    }
}

export default connect((state) => {
    return {screenVersion: state.screenVersion};
})(InfoGroup);