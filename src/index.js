import React      from 'react';
import ReactDOM         from 'react-dom';
import App              from './App';
import {Provider}       from 'react-redux';
import io               from 'socket.io-client';

const  store  = require('./Redux/redux.js');
const  socket = io.connect('http://localhost:3000/');

socket.on('message', msg => console.log("Message: " + msg));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
