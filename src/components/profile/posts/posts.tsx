import React, {FC} from 'react';
import Post from './post/post';
import {PagesProps} from "../../../index";

const Posts: FC<PagesProps> = ({posts}) => {
    return (
        <>
            <h3>My posts</h3>
            <Post posts={posts}/>
        </>
    )
}

export default Posts;