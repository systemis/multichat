import React, { Component }                         from 'react';
import {BrowserRouter as Router, Route, hasHistory} from 'react-router-dom';
import $                                            from 'jquery';
import {connect}                                    from 'react-redux';
import HomePage                                     from './Page/Home/home.js';
import SignInPage                                   from './Page/Login/sign-in.js';
import SignUpPage                                   from './Page/Login/sign-up.js';
import userMG                                       from './js/user.js';
import chatSocket                                   from './js/chat.js';
import './App.css';

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
    this.setState({screenWidth: $(window).width()});
    if($(window).width() <= 768){
      this.changeScreenVersion('mobile');
    }
  }

  changeScreenVersion(value){
    const {dispatch} = this.props;
    dispatch({type: 'change screen version', value: value});
  }

  getClientInfo(){
    const {dispatch} = this.props;
      const sefl       = this;
    userMG.getClientInfo((err, result) => {
      if(!err) {
        dispatch({type: "CHANGE_CLIENT_ID", value: result.id});
        dispatch({type: "CHANGE_CLIENT_INFO", value: result});
        dispatch({type: "CHANGE_CHAT_ID", value: result.id})
        dispatch({type: "CHANGE_USER_INFO", value: result});
        dispatch({type: "CHANGE_NOTIFICATIONS", value: result.notifications});
      }
    })
  }

  getUsersList(clientId){
      const {dispatch} = this.props;
      if(clientId){
        if(this.props.usersList) return;
        userMG.getUserLists(clientId, (err, result) => {
          dispatch({type: `CHANGE_USERS_LIST`, value: result});
        })
      }
  }

  render() {
    return (
      <Router>
        <div id="App">
          <Route exact path="/"  component={DieuHuong} />
          <Route path="/home"    component={HomePage} />
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
      if(width < 768 && oldW > 768 || width > 768 && oldW < 768){
        sefl.setState({screenWidth: width});
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.screenWidth > 768){
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
    usersList: state.usersList,
    screenVersion: state.screenVersion
  };
})(App);
