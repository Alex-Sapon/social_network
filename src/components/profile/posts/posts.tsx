import React, {FC} from 'react';
import Post from './post/post';
import {PostsProps} from '../../../redux/state';
import {Typography} from "@mui/material";

type PostsType = {
    posts: PostsProps[]
}

const Posts: FC<PostsType> = (props) => {
    return (
        <>
            <Typography variant="h4" component="h4" sx={{marginBottom: '1rem'}}>My posts</Typography>
            <Post posts={props.posts}/>
        </>
    )
}

export default Posts;