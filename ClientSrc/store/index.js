/* eslint-disable no-underscore-dangle */

import thunk from 'redux-thunk';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';

import { applyMiddleware, compose, createStore } from 'redux';
import reducers from '../reducers/reducers';

const socket = io();
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk, socketIoMiddleware)));

export default store;
