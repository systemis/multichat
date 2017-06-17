import React, { Component } from 'react';
import {BrowserRouter as Router, Route, hasHistory} from 'react-router-dom';
import HomePage from './Page/Home/home.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="App">
          <Route exact path='/' component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
