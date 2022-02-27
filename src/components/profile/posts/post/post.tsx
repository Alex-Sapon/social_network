import React, {FC} from 'react';
import Rating from '../rating/rating';
import {StateProps} from "../../../../redux/state";

import {Card, Typography} from "@mui/material";
import {teal} from "@mui/material/colors";
import styles from './post.module.css';

const Post: FC<StateProps> = (state) => {
    return (
        <>
            {state.posts?.map((post, i) =>
                <Card key={post.id} sx={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: teal[50]
                }}>
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{marginBottom: '0.5rem'}}
                    >Post № {i + 1}</Typography>
                    <Typography
                        component="p"
                        sx={{marginBottom: '0.5rem'}}
                    >{post.message}</Typography>
                    <Rating stars={post.likesCount}/>
                </Card>
            )}
        </>
    )
}

export default Post;