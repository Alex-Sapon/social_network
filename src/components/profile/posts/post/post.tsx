import React, {FC} from 'react';
import styles from './post.module.css';
import Rating from '../rating/rating';
import {PagesProps} from "../../../../index";

//** Styles from MUI **//
import {Card} from "@mui/material";


const Post: FC<PagesProps> = ({posts}) => {
    return (
        <>
            {posts?.map((post, i) =>
                <Card key={i} sx={{
                    padding: '10px',
                    marginBottom: '10px',
                    width: '100%'}}>
                    <h3>Post № {post.id}</h3>
                    <p>{post.message}</p>
                    <Rating stars={post.likesCount}/>
                </Card>
            )}
        </>
    )
}

export default Post;