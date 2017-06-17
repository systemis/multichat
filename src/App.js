import React, { Component } from 'react';
import $ from 'jquery';
import {BrowserRouter as Router, Route, hasHistory} from 'react-router-dom';
import HomePage from './Page/Home/home.js';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {screenWidth: 0};
  }

  componentWillMount() {
    this.setState({screenWidth: $(window).width()});
  }

  render() {
    const renderRouter = () => {
      const width = this.state.screenWidth;
      if(width > 768){
        return <Route exact path='/' component={HomePage} />;
      }else{
        return (
          <div>
              <Route exact path='/' component={HomePage} />;
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

export default App;
