import React, {FC} from 'react';
import RatingStars from '../RatingStars/RatingStars';

import {Card, Typography} from '@mui/material';
import {teal} from '@mui/material/colors';
import {PostsProps} from '../Posts';

type PostType = {
    posts: PostsProps[]
}

export const Post: FC<PostType> = ({posts}) => {
    return (
        <>
            {posts
                ? posts.map(({id, post, likesCount}, i) =>
                    <Card key={id} sx={{padding: '1rem', mb: '1rem', bgcolor: teal[50]}}>
                        <Typography variant="subtitle1" sx={{mb: '0.5rem', fontSize: '1.3rem'}}>
                            Post № {i + 1}</Typography>
                        <Typography variant="body2" sx={{mb: '0.5rem', fontSize: '1rem'}}>{post}</Typography>
                        <RatingStars stars={likesCount}/>
                    </Card>)
                : <Typography variant="h3" sx={{mb: '0.5rem', fontSize: '1.3rem'}}>No posts...</Typography>}
        </>
    )
};
