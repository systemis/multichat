import React, { Component }                         from 'react';
import {BrowserRouter as Router, Route, hasHistory} from 'react-router-dom';
import $                                            from 'jquery';
import {connect}                                    from 'react-redux';

import HomePage                                     from './Page/Home/home.js';
import ChatGroup                                    from './Components/Chat/chat.js';
import './App.css';


const testCom = () => {
  return(
    <div>
      Mobile
    </div>
  )
} 

class App extends Component {
  constructor(props){
    super(props);
    this.state = {screenWidth: 0};
  }

  componentWillMount() {
    console.log("Screen version" + this.props.screenVersion);
    this.setState({screenWidth: $(window).width()});
    if($(window).width() <= 991){
      this.changeScreenVersion('mobile');
    }
  }


  changeScreenVersion(value){
    const {dispatch} = this.props;
    dispatch({type: 'change screen version', value: value});
  }

  renderRouter(){
    if(this.props.screenVersion === 'desktop'){
      return <ChatGroup />;
    }else{
      return <ChatGroup />;
    }
  }

  render() {
    return (
      <Router>
        <div id="App">
          {this.renderRouter()}
        </div>
      </Router>
    );
  }

  componentDidMount() {
    const sefl = this;
    window.onresize = () => {
      const width = $(window).width();
      const oldW  = this.state.screenWidth;
      if(width < 991 && oldW > 991 || width > 991 && oldW < 991){
        sefl.setState({screenWidth: width});
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.screenWidth > 991){
      this.changeScreenVersion("desktop");
    }else{
      this.changeScreenVersion("mobile");
    }
    
    this.render();
    return true;    
  }
}

export default connect((state) => {
  return {
    screenVersion: state.screenVersion
  };
})(App);