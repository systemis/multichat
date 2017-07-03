import React            from 'react';
import ReactDOM         from 'react-dom';
import {Provider}       from 'react-redux';
import App              from './App';
import store            from './Redux/index.js';

ReactDOM.render(
    <div id="main-layout">
        <Provider store={store}>
            <App />
        </Provider>
        <div id="handler-screen" style={{display: 'none'}}>
            <h3 className="_progress">Loading ...</h3>
        </div>
    </div>,
    document.getElementById('root')
);
 