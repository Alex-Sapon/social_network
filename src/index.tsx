import React from 'react';
import store from './redux/redux-store';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const renderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root'));
};

renderEntireTree();

store.subscribe(() => {
    renderEntireTree()
}) // когда state меняется, запрашиваем у store state и отдаем subscribe


