import React from 'react';
import {store} from './redux/redux-store';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {SamuraiJSApp} from './App';

ReactDOM.render(<SamuraiJSApp/>, document.getElementById('root'));




