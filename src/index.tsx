import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {MessagesProps, PostsProps, state, addPost,UsersProps} from "./Redux/State";

export interface PagesProps {
    posts?: PostsProps[]
    users?: UsersProps[]
    messages?: MessagesProps[]
    addPost?: (message: string) => void
}

ReactDOM.render(<App
    posts={state.posts}
    users={state.users}
    messages={state.messages}
    addPost={addPost}/>, document.getElementById('root'));

reportWebVitals();
