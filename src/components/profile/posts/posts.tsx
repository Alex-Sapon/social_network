import React, {FC} from 'react';
import Post from './post/post';
import {StorePropsType} from "../../../redux/state";
import {Typography} from "@mui/material";

const Posts: FC<StorePropsType> = (state) => {
    return (
        <>
            <Typography variant="h4" component="h4" sx={{marginBottom: '1rem'}}>My posts</Typography>
            <Post posts={state.state?.posts}/>
        </>
    )
}

export default Posts;