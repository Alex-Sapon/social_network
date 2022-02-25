import React from 'react';
import './index.css';

import {MessagesProps, PostsProps, UsersProps, state} from "./redux/state";
import {renderEntireTree} from "./render";

export interface PagesProps {
    posts?: PostsProps[]
    users?: UsersProps[]
    messages?: MessagesProps[]
    textArea?: string
    addPost?: () => void
    updateNewPostText?: (text: string) => void
}

renderEntireTree({state});

