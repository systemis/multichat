import React, { Component } from 'react';
import {connect}            from 'react-redux';
import Navigation           from '../../Components/Navigation/navigation.js';
import ChatGroup            from '../../Components/Chat/chat.js';
import InfoGroup            from '../../Components/Info/info.js';
import socketMG             from '../../js/socket.js';
import './Style/home-mobile.css';

var countCheck = 0;

const screensPage     = [<Navigation />, <ChatGroup />, <InfoGroup />];

class HomePage extends Component {
    showActiveHolde(index){
        const toolsListdom = document.getElementsByClassName('choose-screen-tab');
        for(var i = 0; i < toolsListdom.length; i++){
            toolsListdom[i].classList.remove('active');
        }
        toolsListdom[index].classList.add('active');
    }

    handlerScreen(){
        return screensPage[this.props.index];
    }

    changeIndexScreen(value){
        if(this.props.index !== value) {
            if(value === 1 && JSON.stringify(this.props.chatRoomInfo) === '{}') return;
            this.showActiveHolde(value);
            this.props.dispatch({type: 'CHANGE_INDEX_SHOW_SPM', value: value});
        }
    }

    mainLayout(){
        if(this.props.screenVersion ==='desktop'){
            return (
                <div className="home-page row">
                    <Navigation />
                    <ChatGroup  />
                    <InfoGroup  />
                </div>
            )
        }

        return (
            <div className="home-page-mobile">
                {this.handlerScreen()}
                <div className="bottom-bar">
                    <div className="row">
                        <ul className="show-tools">
                            <li className="choose-screen-tab active" 
                                onClick={() => this.changeIndexScreen(0)}>
                                    <p> <i className="fa fa-home" aria-hidden="true"></i> </p>
                            </li>
                            <li className="choose-screen-tab" 
                                onClick={() => this.changeIndexScreen(1)}>
                                    <p> <i className="fa fa-commenting" aria-hidden="true"></i> </p>
                                </li>
                            <li className="choose-screen-tab" 
                                onClick={() => this.changeIndexScreen(2)}>
                                    <p> <i className="fa fa-info" aria-hidden="true"></i> </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.mainLayout();
    }


    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.clientId && this.props.clientId !== nextProps.clientId){
            if(countCheck !== 0) return;
            
            console.log(nextProps.clientId);
            socketMG.onLineEvent(nextProps.clientId);
            ++countCheck;
        }

        return true;
    }
}

export default connect(state => {
    return {
        screenVersion: state.screenVersion, 
        clientId: state.clientId,
        index: state.indexShowSPM,
        chatRoomInfo: state.chatRoomInfo
    }
})(HomePage);