import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {addPost, StateTypeProps} from "./Redux/State";

export const renderEntireTree = ({state}: StateTypeProps) => {
    ReactDOM.render(<App
        posts={state.posts}
        users={state.users}
        messages={state.messages}
        addPost={addPost}/>, document.getElementById('root'));
};