import React, { Component } from 'react';
import {connect}            from 'react-redux';
import userMG               from '../../js/user.js';
import testAvatar           from '../../Image/test_avatar_men.jpg';
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
                            {this.props.userInfo.name}
                            <span className="caret" />
                        </span>
                        <ul className="dropdown-menu">
                            <li className="dropdown-header">Dropdown header 1</li>
                            <li><a href="#">HTML</a></li>
                            <li><a href="#">CSS</a></li>
                            <li>
                                <a>
                                    <span onClick={() => userMG.disConnect(this.props.clientId)}>
                                        Log out
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="show-info">
                    <div className="show-simple-info">
                        <div className="show-avatar">
                            <p>
                                <img src={this.props.userInfo.avatar} alt="User Avatar " />
                            </p>
                        </div>
                        <div className="show-name-andress">
                            <p className="show-name"   > {this.props.userInfo.name} </p>
                            <p className="show-andress"> {this.props.userInfo.name} </p>
                        </div>
                    </div>
                    <div className="show-default-info">
                        <table className="table-show-user-default-info">
                            <tr> 
                                <td className="show-title">Nick name:</td>
                                <td className="show-value">{this.props.userInfo.name}</td>
                            </tr>
                            <tr> 
                                <td className="show-title">Tel:</td>
                                <td className="show-value">{this.props.userInfo.phone}</td>
                            </tr>
                            <tr> 
                                <td className="show-title">Date of birth:</td>
                                <td className="show-value">{new Date().toLocaleDateString()}</td>
                            </tr>
                            <tr> 
                                <td className="show-title">Gender</td>
                                <td className="show-value">{this.props.userInfo.gender}</td>
                            </tr>
                            <tr> 
                                <td className="show-title">Language</td>
                                <td className="show-value">{this.props.userInfo.language}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        clientId: state.clientId, 
        screenVersion: state.screenVersion, 
        userInfo: state.userInfo
    };
})(InfoGroup);