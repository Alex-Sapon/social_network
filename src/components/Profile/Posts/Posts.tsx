import React from 'react';
import {Post} from './Post/Post';

import {Box, Typography} from '@mui/material';
import {PostType} from '../../../redux/profile-reducer';
import PostForm, {PostFormDataType} from '../PostForm/PostForm';

export type PostsProps = {
    id: string
    message: string
    likesCount: number
}

type PostsType = {
    posts: Array<PostType>
    addPost: (post: string) => void
}

export const Posts = ({addPost, posts}: PostsType) => {

    const onSubmit = (formData: PostFormDataType) => {
        const post = formData.post;

        post && post.trim() !== '' && addPost(post);
    };

    return (
        <Box>
            <Typography variant="h4" component="h4" sx={{mb: '1rem', textAlign: 'center'}}>My posts</Typography>
            <PostForm onSubmit={onSubmit}/>
            <Post posts={posts}/>
        </Box>
    )
};