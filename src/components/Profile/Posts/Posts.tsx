import React, {FC, useRef} from 'react';
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

const Posts: FC<PostsType> = (props) => {
    const refInput = useRef<HTMLInputElement>(null!)

    const onAddPost = () => props.addPost()

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.addPost()
        }
    }

    const onPostChange = () => props.updatePost(refInput.current.value)

    return (
        <>
            <FormGroup sx={{mb: '1rem'}}>
                <input
                    className={styles.input}
                    ref={refInput}
                    value={props.newPost}
                    onChange={onPostChange}
                    onKeyPress={keyPressHandler}
                />
                <Button
                    size="small"
                    variant="contained"
                    sx={{
                        maxWidth: '150px',
                        bgcolor: blueGrey[50],
                        color: blueGrey[700],
                        '&:hover': {bgcolor: blueGrey[200]}
                    }}
                    endIcon={<SendIcon/>}
                    onClick={onAddPost}
                >Add post</Button>
            </FormGroup>
            <Typography variant="h4" component="h4" sx={{mb: '1rem'}}>My posts</Typography>
            <Post posts={props.posts}/>
        </>
    )
}

export default Posts;