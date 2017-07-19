import React, { Component } from 'react';
import {connect}            from 'react-redux';
import UpdateGroup          from './update.component.js';
import NotificationsGroup   from './notifications.component.js';
import userMG               from '../../js/user.js';
import testAvatar           from '../../Image/test_avatar_men.jpg';
import $                    from 'jquery';
import './Style/info-group-style.css';

class InfoGroup extends Component {
    constructor(props){
        super(props);
        this.state = {isChange: false, indexShowMainLayout: 0, userInfo: {}}
        this.backIndexScreen = this.backIndexScreen.bind(this);
    }

    backIndexScreen(){
        this.setState({indexShowMainLayout: 0});
    }

    editBtn(){
        if(!this.state.isChange){
            return ;
        }

        return (
            <span 
                className="fa fa-pencil" 
                aria-hidden="true"
                onClick={() => {
                    this.setState({indexShowMainLayout: 1});
                }}/>
        )
    }

    changeAvatarGroup(){
        if(this.state.isChange){
            return (
                <form 
                    id="form-update-user-avatar"
                    action="/update/user/avatar"
                    method="POST"
                    encType="multipart/form-data">
                    <input 
                        type="file" 
                        name="image" 
                        id="upload-avatar-field" 
                        onChange={() => {
                            document.getElementById('form-update-user-avatar').submit();
                        }}/>
                </form>
            )
        }

        return ; 
    }

    mainLayout_showinfo(){
        if(this.state.indexShowMainLayout > 0){
            return (
                <UpdateGroup 
                    data={this.props.userInfo} 
                    backIndexScreen={this.backIndexScreen}/>
            )
        }

        return(
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
                        <td className="show-title">Andress</td>
                        <td className="show-value">{this.props.userInfo.andress}</td>
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
        )
    }

    render() {
        const className = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'desktop';
            }}
        return (
            <div className={className()} id="info-group">
                <div className="header-bar">
                    <NotificationsGroup />
                    <div className="dropdown">
                        <span 
                            className="show-client-name dropdown-toggle"
                            data-toggle="dropdown"
                            onClick={() => {
                                let {dispatch}   = this.props;
                                let {clientInfo} = this.props;
                                let {clientId}   = this.props;
                                // dispatch({type: 'CHANGE_USER_INFO', value: clientInfo});
                                dispatch({type: 'CHANGE_CHAT_ID'  ,  value: clientId})
                            }}>
                                {this.props.clientInfo.name}
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
                                {this.changeAvatarGroup()}
                            </p>
                        </div>
                        <div className="show-name-andress">
                            <p 
                                className="show-name"> 
                                {this.props.userInfo.name} 
                                {this.editBtn()}
                            </p>
                            <p className="show-andress"> 
                                {this.props.userInfo.status} 
                            </p>
                        </div>
                    </div>
                    {this.mainLayout_showinfo()}
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.chatId !== nextProps.chatId){
            userMG.checkIsClient(nextProps.chatId, isClient => {
                this.setState({isChange: isClient});
            })
        }

        this.render();
        return true;        
    }
}

export default connect(state => {
    return {
        clientInfo: state.clientInfo,
        screenVersion: state.screenVersion, 
        userInfo: state.userInfo,
        chatId: state.chatId,
        notifications: state.notifications
    };
})(InfoGroup);