import React, {FC} from 'react';
import styles from './Post.module.css';
import Rating from '../Rating/Rating';

//** Styles from MUI **//
import {Card} from "@mui/material";
import {PagesProps} from "../../../../index";

const Post: FC<PagesProps> = ({posts}) => {
    return (
        <>
            {posts?.map(post =>
                <Card sx={{padding: '10px', marginBottom: '10px', width: '100%'}}>
                    <h3>Post № {post.id}</h3>
                    <p>{post.message}</p>
                    <Rating stars={post.likesCount}/>
                </Card>
            )}
        </>
    )
}

export default Post;