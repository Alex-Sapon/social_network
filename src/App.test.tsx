import React from 'react';
import ReactDOM from 'react-dom';
import {SamuraiJSApp} from './App';
import {Provider} from 'react-redux';
import {store} from './redux/redux-store';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Provider store={store}><SamuraiJSApp/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);

})