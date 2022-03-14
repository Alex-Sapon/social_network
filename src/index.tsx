import React from 'react';
import store, {StoreType} from './redux/redux-store';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from './StoreContext'

const renderEntireTree = (store: StoreType) => {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root'));
};

renderEntireTree(store);
store.subscribe(() => {
    renderEntireTree(store)
}) // когда state меняется, запрашиваем у store state и отдаем subscribe


