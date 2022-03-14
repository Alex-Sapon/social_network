import React, {FC} from 'react';
import Posts from './Posts';

import {StoreType} from '../../../redux/redux-store';
import {addPostActionCreator, updatePostChangeActionCreator} from '../../../redux/profile-reducer';
import StoreContext from '../../../StoreContext';

type PostsType = {
    props: StoreType
}

const PostsContainer: FC = () => {
    return (
        <StoreContext.Consumer>
            {store => {
                const addPost = () => store.dispatch(addPostActionCreator())
                const onPostChange = (text: string) => store.dispatch(updatePostChangeActionCreator(text))

                return (
                    <Posts
                        posts={store.getState().profilePage.posts}
                        newPost={store.getState().profilePage.newPost}
                        addPostActionCreator={addPost}
                        updatePostChangeActionCreator={onPostChange}
                    />
                )
            }}
        </StoreContext.Consumer>
    )
}

export default PostsContainer;