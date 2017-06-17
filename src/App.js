import React, { Component }                         from 'react';
import {BrowserRouter as Router, Route, hasHistory} from 'react-router-dom';
import $                                            from 'jquery';
import {connect}                                    from 'react-redux';

import HomePage                                     from './Page/Home/home.js';
import Navigation                                   from './Components/Navigation/navigation.js';
import InfoGroup                                    from './Components/Info/info.js';
import ChatGroup                                    from './Components/Chat/chat.js';
import './App.css';

function handlingHref(){
  if($(window).width() > 991 && window.location.href.indexOf('/chat') >= 0){
    window.location.href = '/';
  }
}

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

  renderRouter(){
    if(this.props.screenVersion === 'desktop'){
      return <HomePage />;
    }else{
      return (
        <div>
          <Route exact path="/" component={Navigation} />
          <Route path="/chat"  component={ChatGroup} />
          <Route path="/info"  component={InfoGroup} />
        </div>
      )
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
    handlingHref();
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