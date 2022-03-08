import React from 'react';
import './index.css';
import {StoreProps, store} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./app";

const renderEntireTree = (state: StoreProps) => {
    ReactDOM.render(<App state={state} dispatch={store.dispatch.bind(store)}/>, document.getElementById('root'));
};

renderEntireTree(store.getState());
store.subscribe(renderEntireTree);

