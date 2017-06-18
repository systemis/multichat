import React, { Component } from 'react';
import {connect}            from 'react-redux';
import $                    from 'jquery';
import './Style/navigation-style.css';

class Navigation extends Component {
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

    render() {
        const bigGroupClassName = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'desktop';
            }
            return '';
        }
        const childGroupClassName = () => {
            if(this.props.screenVersion === 'desktop'){
                return 'desktop';
            }
            return "";
        }
        return (
            <div className={bigGroupClassName()} id="navigation-show-user-online">
                <div className="row">
                    {this.LeftNavi()}
                    <div className={childGroupClassName()} id="navigation-show-user-online-main-navi">
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