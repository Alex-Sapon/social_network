import React, {FC} from 'react';
import Posts from './Posts';

import {StoreType} from '../../../redux/redux-store';
import {addPostActionCreator, updatePostChangeActionCreator} from '../../../redux/profile-reducer';

type PostsType = {
    props: StoreType
}

const PostsContainer: FC<PostsType> = ({props}) => {
    const addPost = () => props.dispatch(addPostActionCreator())

    const onPostChange = (text: string) => props.dispatch(updatePostChangeActionCreator(text))

    return (
        <Posts
            posts={props.getState().profilePage.posts}
            newPost={props.getState().profilePage.newPost}
            addPostActionCreator={addPost}
            updatePostChangeActionCreator={onPostChange}
        />
    )
}

export default PostsContainer;