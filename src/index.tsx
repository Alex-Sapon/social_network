import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {MessagesProps, PostsProps, state, UsersProps} from "./Redux/State";

export type PagesProps = {
    posts?: PostsProps[]
    users?: UsersProps[]
    messages?: MessagesProps[]
}

ReactDOM.render(<App posts={state.posts} users={state.users} messages={state.messages}/>, document.getElementById('root'));

reportWebVitals();
