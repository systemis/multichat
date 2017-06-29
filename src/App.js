import React, { Component }                         from 'react';
import {BrowserRouter as Router, Route, hasHistory} from 'react-router-dom';
import $                                            from 'jquery';
import {connect}                                    from 'react-redux';

import HomePage                                     from './Page/Home/home.js';
import SignInPage                                   from './Page/Login/sign-in.js';
import SignUpPage                                   from './Page/Login/sign-up.js';
import Navigation                                   from './Components/Navigation/navigation.js';
import InfoGroup                                    from './Components/Info/info.js';
import ChatGroup                                    from './Components/Chat/chat.js';
import userMG                                       from './js/user.js';
import chatSocket                                   from './js/chat.js';
import './App.css';


const handlingHref = () => {
  if($(window).width() > 991){
    if(window.location.href.indexOf('/chat') >= 0 || window.location.href.indexOf('/info') >= 0){
      window.location.href = '/';
    }}}
const DieuHuong = React.createClass({
  render(){
    return (
      <div>Xin chao {window.location.href = "/home"}</div>
    );
  }})



class App extends Component {
  constructor(props){
    super(props);
    this.state = {screenWidth: 0};
  }

  componentWillMount() {
    handlingHref();
    this.setState({screenWidth: $(window).width()});
    if($(window).width() <= 991){
      this.changeScreenVersion('mobile');
    }
  }

  changeScreenVersion(value){
    const {dispatch} = this.props;
    dispatch({type: 'change screen version', value: value});
  }

  getClientInfo(){
    const {dispatch} = this.props;
    userMG.getClientInfo((err, result) => {
      if(!err) {
        dispatch({type: "CHANGE_CLIENT_ID", value: result.id});
        dispatch({type: "CHANGE_CLIENT_INFO", value: result});
        dispatch({type: "CHANGE_CHAT_ID", value: result.id})
        dispatch({type: "CHANGE_USER_INFO", value: result});
      }
    })

  }

  getUsersList(clientId){
      const {dispatch} = this.props;
      if(clientId !== -1){
        userMG.getUserLists(clientId, (err, result) => {
          dispatch({type: `CHANGE_USERS_LIST`, value: result});
        })
      }
  }

  router(){
    if(this.props.screenVersion === 'desktop'){
      return (
        <div>
          <Route exact path="/home" component={HomePage} />
        </div>
      )
    }else{
      return (
        <div>
          <Route exact path="/home" component={Navigation} />
          <Route path="/chat/:roomId"   component={ChatGroup} />
          <Route path="/info"   component={InfoGroup} />
        </div>
      )
    }
  }

  render() {
    return (
      <Router>
        <div id="App">
          <Route exact path="/" component={DieuHuong} />
          {this.router()}
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/sign-up" component={SignUpPage} />
        </div>
      </Router>
    );
  }

  componentDidMount() {
    const sefl = this;
    this.getClientInfo();
    this.getUsersList(this.props.clientId);
    window.onresize = () => {
      const width = $(window).width();
      const oldW  = this.state.screenWidth;
      if(width < 991 && oldW > 991 || width > 991 && oldW < 991){
        sefl.setState({screenWidth: width});
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    handlingHref();
    if(nextState.screenWidth > 991){
      this.changeScreenVersion("desktop");
    }else{
      this.changeScreenVersion("mobile");
    }

    this.render();
    this.getUsersList(nextProps.clientId);
    return true;
  }
}

export default connect((state) => {
  return {
    clientId: state.clientId,
    screenVersion: state.screenVersion
  };
})(App);
