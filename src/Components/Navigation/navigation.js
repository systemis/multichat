import React, { Component } from 'react';
import {connect}            from 'react-redux';
import $                    from 'jquery';
import avatar               from '../../Image/test_avatar.jpg';
import SearchGroup          from './search-group.js';
import SearchView           from './search-view.js';
import UsersView            from './users-view';
import './Style/navigation-style.css';

var test = ["Yeu", "An", "Song"];
class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultUser: [{
                name: 'test user', 
                status: 'I like code ...', 
                avatar: avatar}],
            searchUser: [{}],
            isSearching: false,
            doneSearching: false
        }

        this.searchEvent = this.searchEvent.bind(this);
    }

    searchEvent(value){
        const searchValue = value;
        if(value){
            console.log("Search value " + value);
            this.setState({doneSearching: false});
            setTimeout(() => this.setState({doneSearching: true}), 1000);
            this.setState({isSearching: true})
        }else{
            this.setState({isSearching: false})
        }
    }

    LeftNavi(){
        if(this.props.screenVersion === 'desktop'){
            return (
                <div id="left-navi">
                    <p style={{textAlign: 'center'}}>
                        <i className="fa fa-bars" 
                           aria-hidden="true" 
                           id="show-hiden-main-navi-btn"></i>
                    </p>
                </div>
            )
        }
        return ;
    }

    mainLayout(){
        if(this.state.isSearching){
            if(this.state.doneSearching){
                return <SearchView data={this.state.searchUser}/>
            }else{
                return(
                    <h3 
                        className="progessbar" 
                        style={{textAlign: 'center'}}> 
                            Dang tai du lieu 
                    </h3>
                )
            }
        }else{
            return <UsersView data={this.state.defaultUser}/>
        }
    }

    render() {
        const bigGroupClassName = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'desktop';
            }
            return '';}
        const childGroupClassName = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'desktop';
            }
            return "";}
        return (
            <div className={bigGroupClassName()} id="navigation-show-user-online">
                <div className="row">
                    {this.LeftNavi()}
                    <div className={childGroupClassName()} id="navigation-show-user-online-main-navi">
                        <SearchGroup searchEvent={this.searchEvent} />
                        {this.mainLayout()}
                        {this.props.screenVersion}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        $(document).ready(() => {
            $("#show-hiden-main-navi-btn").click(function(){
                if($("#navigation-show-user-online-main-navi").hasClass('hiden')){
                    $("#navigation-show-user-online").css({width: '25%'});
                    $("#chat-group").css({width: '50%'});
                    $("#left-navi").css({width: '10%'})
                }else{
                    $("#navigation-show-user-online").css({width: '3%'});
                    $("#chat-group").css({width: '72%'});
                    $("#left-navi").css({width: '100%'})
                };
                $("#navigation-show-user-online-main-navi").toggleClass('hiden')
            })
        })
    }
}

export default connect((state) => {return {screenVersion: state.screenVersion}})(Navigation);