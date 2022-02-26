import React from 'react';
import './index.css';
import {MessagesProps, PostsProps, UsersProps, state, updateNewPost, addPost, subscribe} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./app";

export interface PagesProps {
    posts?: PostsProps[]
    users?: UsersProps[]
    messages?: MessagesProps[]
    textArea?: string
    addPost?: () => void
    updateNewPostText?: (text: string) => void
}

const renderEntireTree = (state: PagesProps) => {
    ReactDOM.render(<App
        posts={state.posts}
        users={state.users}
        messages={state.messages}
        textArea={state.textArea}
        updateNewPostText={updateNewPost}
        addPost={addPost}/>, document.getElementById('root'));
};

renderEntireTree(state);
subscribe(renderEntireTree);

