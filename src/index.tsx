import React from 'react';
import './index.css';
import {StoreProps} from './redux/store';
import store from './redux/redux-store';
import ReactDOM from 'react-dom';
import App from './app';

const renderEntireTree = (state: StoreProps) => {
    ReactDOM.render(<App state={state} dispatch={store.dispatch.bind(store)}/>, document.getElementById('root'));
};

renderEntireTree(store.getState());
store.subscribe(() => {
    const state = store.getState()
    renderEntireTree(state)
})


