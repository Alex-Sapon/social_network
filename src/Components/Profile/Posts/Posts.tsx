import React, {FC} from 'react';
import Post from './Post/Post';
import {PagesProps} from "../../../index";

const Posts: FC<PagesProps> = ({posts}) => {
    return (
        <>
            <h3>My posts</h3>
            {posts?.map(post => <Post key={post.id} id={post.id} message={post.message} likesCount={post.likesCount}/>)}
        </>
    )
}

export default Posts;