import React, { Component }                         from 'react';
import {BrowserRouter as Router, Route, hasHistory} from 'react-router-dom';
import {connect}                                    from 'react-redux';
import HomePage                                     from './Page/Home/home.js';
import $                                            from 'jquery';
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
    console.log("Screen version" + this.props.versionScreen);
    this.setState({screenWidth: $(window).width()});
  }

  render() {
    const renderRouter = () => {
      const width = this.state.screenWidth;
      if(width > 991){
        // reduxMG.dispatch({type: 'change version screen', value: 'desktop'});
        return <Route exact path='/' component={HomePage} />
      }else{
        // reduxMG.dispatch({type: 'change version screen', value: 'mobile'});
        // console.log("Version screen: " + reduxMG.getState().versionScreen);
        
        return (
          <div>
              <Route exact path='/' component={testCom} />
          </div>
        )
      }
    }
    
    return (
      <Router>
        <div id="App">
          {renderRouter()}
        </div>
      </Router>
    );
  }

  componentDidMount() {
    window.onresize = () => {
      this.setState({screenWidth: $(window).width()});
    }    
  }
}

module.exports = connect(function(state){
  return {
    versionScreen: state.versionScreen
  }
})(App)