import React from 'react';
import {store} from './redux/redux-store';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import {App} from './components/App';

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>,
    document.getElementById('root'));




