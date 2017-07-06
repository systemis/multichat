import React, { Component } from 'react';
import {connect}            from 'react-redux'
import Navigation           from '../../Components/Navigation/navigation.js';
import ChatGroup            from '../../Components/Chat/chat.js';
import InfoGroup            from '../../Components/Info/info.js';
import './Style/home-mobile.css';

const screensPage = [<Navigation />, <ChatGroup />, <InfoGroup />];

class HomePageMobile extends Component {
    handlerScreen(){
        return screensPage[this.props.index];
    }

    changeIndex(value){
        if(this.props.index !== value) {
            this.props.dispatch({type: 'CHANGE_INDEX_SHOW_SPM', value: value});
        }
    }

    componentDidMount() {
        console.log(this.props.index);
    }

    render() {
        return (
            <div className="home-page-mobile">
                {this.handlerScreen()}
                <div className="bottom-bar">
                    <div className="row">
                        <ul className="show-tools">
                            <li className="choose-screen-tab" 
                                onClick={() => this.changeIndex(0)}>
                                    <p> <i className="fa fa-home" aria-hidden="true"></i> </p>
                            </li>
                            <li className="choose-screen-tab" 
                                onClick={() => this.changeIndex(1)}>
                                    <p> <i className="fa fa-commenting" aria-hidden="true"></i> </p>
                                </li>
                            <li className="choose-screen-tab" 
                                onClick={() => this.changeIndex(2)}>
                                    <p> <i className="fa fa-info" aria-hidden="true"></i> </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {return {index: state.indexShowSPM}})(HomePageMobile);