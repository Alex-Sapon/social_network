import React from 'react';
import './index.css';

import {MessagesProps, PostsProps, UsersProps, state} from "./Redux/State";
import {renderEntireTree} from "./render";

export interface PagesProps {
    posts?: PostsProps[]
    users?: UsersProps[]
    messages?: MessagesProps[]
    addPost?: (message: string) => void
}

renderEntireTree({state});

