import React from 'react';
import RatingStars from '../RatingStars/RatingStars';

import {Card, Typography} from '@mui/material';
import {teal} from '@mui/material/colors';

export const Post = ({post, likesCount}: {post: string, likesCount: number}) => {
    return (
        <Card sx={{padding: '1rem', mb: '1rem', bgcolor: teal[50]}}>
            <Typography variant="subtitle1" sx={{mb: '0.5rem', fontSize: '1.3rem'}}>
                Post № {1}
            </Typography>
            <Typography variant="body2" sx={{mb: '0.5rem', fontSize: '1rem'}}>{post}</Typography>
            <RatingStars stars={likesCount}/>
        </Card>
    )
};
