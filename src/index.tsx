import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// State data
import {state} from './Redux/State';

ReactDOM.render(<App state={state}/>, document.getElementById('root'));

reportWebVitals();
