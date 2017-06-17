import React, { Component } from 'react';
import {connect}            from 'react-redux';

class InfoGroup extends Component {
    render() {
        const className = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'info-group col-md-3'
            }else{
                return 'info-group'
            }
        }

        return (
            <div className={className()}>
                {this.props.screenVersion}
            </div>
        );
    }
}

export default connect((state) => {
    return {screenVersion: state.screenVersion};
})(InfoGroup);