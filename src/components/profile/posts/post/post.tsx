import React, {FC} from 'react';
import Rating from '../rating/rating';
import {PostsProps} from "../../../../redux/state";

import {Card, Typography} from "@mui/material";
import {teal} from "@mui/material/colors";
import styles from './post.module.css';

type PostType = {
    posts: PostsProps[]
}

const Post: FC<PostType> = (props) => {
    return (
        <>
            {props.posts.map((post, i) =>
                <Card key={post.id} sx={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: teal[50]
                }}>
                    <Typography variant="subtitle1" sx={{marginBottom: '0.5rem', fontSize: '1.3rem'}}>
                        Post № {i + 1}
                    </Typography>
                    <Typography variant='body2' sx={{marginBottom: '0.5rem', fontSize: '1rem'}}>
                        {post.message}
                    </Typography>
                    <Rating stars={post.likesCount}/>
                </Card>
            )}
        </>
    )
}

export default Post;