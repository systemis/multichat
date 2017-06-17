import React      from 'react';
import ReactDOM   from 'react-dom';
import App        from './App';
import {Provider} from 'react-redux';
const  store = require('./Redux/redux.js');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
