import React, {FC} from 'react';
import styles from './Post.module.css';
import Rating from '../Rating/Rating';
import {PostsProps} from "../../../../Redux/State";

//** Styles from MUI **//
import {Card} from "@mui/material";

const Post: FC<PostsProps> = ({id, message, likesCount}) => {
    return (
        <Card sx={{padding: '10px', marginBottom: '10px', width: '100%'}}>
            <h3>Post № {id}</h3>
            <p>{message}</p>
            <Rating stars={likesCount}/>
        </Card>
    )
}

export default Post;