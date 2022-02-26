import React, {FC} from 'react';
import styles from './post.module.css';
import Rating from '../rating/rating';
import {PagesProps} from "../../../../index";

//** Styles from MUI **//
import {Card, Typography} from "@mui/material";
import {teal} from "@mui/material/colors";

const Post: FC<PagesProps> = ({posts}) => {
    return (
        <>
            {posts?.map((post, i) =>
                <Card key={post.id} sx={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    bgcolor: teal[100]
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