import React from 'react';
import './index.css';
import {StateProps, store} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./app";

const renderEntireTree = (state: StateProps) => {
    ReactDOM.render(<App state={state} dispatch={store.dispatch.bind(store)}
    />, document.getElementById('root'));
};

renderEntireTree(store.getState());
store.subscribe(renderEntireTree);

