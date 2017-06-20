import React, { Component } from 'react';
import {connect}            from 'react-redux';
import './Style/info-group-style.css';

class InfoGroup extends Component {
    render() {
        // Class name to custom ui with desktop and mobile version .
        const className = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'desktop';
            }}
        return (
            <div className={className()} id="info-group">
                <div className="header-bar">
                    <div className="dropdown">
                        <span 
                            className="show-client-name dropdown-toggle"
                            data-toggle="dropdown">
                            Matth Thomas
                            <span className="caret" />
                        </span>
                        <ul className="dropdown-menu">
                            <li className="dropdown-header">Dropdown header 1</li>
                            <li><a href="#">HTML</a></li>
                            <li><a href="#">CSS</a></li>
                            <li><a href="#">JavaScript</a></li>
                        </ul>
                    </div>
                </div>
                {this.props.screenVersion}
            </div>
        );
    }
}

export default connect((state) => {
    return {screenVersion: state.screenVersion};
})(InfoGroup);