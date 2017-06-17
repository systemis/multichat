import React      from 'react';
import ReactDOM   from 'react-dom';
import App        from './App';
var {Provider} = require('react-redux');
var store      = require('./Redux/redux.js');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
