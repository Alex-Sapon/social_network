import React, {FC} from 'react';
import Post from './post/post';
import {PagesProps} from "../../../index";
import {Typography} from "@mui/material";

const Posts: FC<PagesProps> = ({posts}) => {
    return (
        <>
            <Typography
                variant="h4"
                component="h4"
                sx={{marginBottom: '1rem'}}
            >My posts</Typography>
            <Post posts={posts}/>
        </>
    )
}

export default Posts;