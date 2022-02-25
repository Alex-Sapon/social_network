import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import {addPost, updateNewPostText, StateTypeProps} from "./redux/state";

export const renderEntireTree = ({state}: StateTypeProps) => {
    ReactDOM.render(<App
        posts={state.posts}
        users={state.users}
        messages={state.messages}
        textArea={state.textArea}
        updateNewPostText={updateNewPostText}
        addPost={addPost}/>, document.getElementById('root'));
};