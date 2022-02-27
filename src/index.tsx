import React from 'react';
import './index.css';
import {StateProps, store} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./app";

const renderEntireTree = (state: StateProps) => {
    console.log(state)
    ReactDOM.render(<App
        state={state}
        updateNewPost={store.updateNewPost.bind(store)}
        addPost={store.addPost.bind(store)}
    />, document.getElementById('root'));
};

renderEntireTree(store.getState());
store.subscribe(renderEntireTree);

