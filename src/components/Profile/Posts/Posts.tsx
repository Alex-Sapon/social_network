import {addPost} from '../profile-reducer';
import PostForm, {PostFormDataType} from '../PostForm/PostForm';
import {Box, Typography} from '@mui/material';
import {Post} from './Post/Post';
import React from 'react';
import {useAppSelector} from '../../../assets/utils';
import {selectProfilePosts} from '../selectors';

export const Posts = () => {

    const posts = useAppSelector(selectProfilePosts);

    const onSubmit = (formData: PostFormDataType) => {
        const post = formData.post;

        post && post.trim() !== '' && addPost({post});
    };

    if (!posts.length) {
        return <Typography variant="h3" sx={{mb: '0.5rem', fontSize: '1.3rem'}}>No posts...</Typography>
    }

    return (
        <Box>
            <Typography variant="h4" component="h4" sx={{mb: '1rem', textAlign: 'center'}}>My posts</Typography>
            <PostForm onSubmit={onSubmit}/>
            {posts.map(({post, likesCount, id}) => <Post key={id} post={post} likesCount={likesCount}/> )}
        </Box>
    )
}
