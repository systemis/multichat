import React, { Component } from 'react';
import {connect}            from 'react-redux';

class Navigation extends Component {
    render() {
        const className = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'navigation col-md-3'
            }else{
                return 'navigation'
            }
        }

        return (
            <div className={className()}>
                {this.props.screenVersion}
            </div>
        );
    }
}

export default connect((state) => {return {screenVersion: state.screenVersion}})(Navigation);