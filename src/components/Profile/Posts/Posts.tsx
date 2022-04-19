import React, {FC, KeyboardEvent, ChangeEvent} from 'react';
import Post from './Post/Post';
import {PostsProps} from '../../../redux/redux-store';

import {Button, FormGroup, Typography} from '@mui/material';
import {blueGrey} from '@mui/material/colors'
import SendIcon from '@mui/icons-material/Send'
import styles from './Posts.module.css'

type PostsType = {
    posts: PostsProps[]
    newPost: string
    addPost: () => void
    updatePost: (text: string) => void
}

export const Posts: FC<PostsType> = ({addPost, newPost, posts, updatePost}) => {
    const onAddPost = () => newPost.trim() !== '' && addPost()
    const keyPressHandler = (e: KeyboardEvent) => e.key === 'Enter' && addPost()
    const onPostChangeHandler = (e: ChangeEvent<HTMLInputElement>) => updatePost(e.currentTarget.value)

    return (
        <>
            <FormGroup sx={{mb: '1rem'}}>
                <input
                    className={styles.input}
                    value={newPost}
                    onChange={onPostChangeHandler}
                    onKeyPress={keyPressHandler}
                />
                <Button size="small" variant="contained" sx={{
                    maxWidth: '150px', bgcolor: blueGrey[50],
                    color: blueGrey[700], '&:hover': {bgcolor: blueGrey[200]}
                }} endIcon={<SendIcon/>} onClick={onAddPost}>Add post</Button>
            </FormGroup>
            <Typography variant="h4" component="h4" sx={{mb: '1rem'}}>My posts</Typography>
            <Post posts={posts}/>
        </>
    )
}