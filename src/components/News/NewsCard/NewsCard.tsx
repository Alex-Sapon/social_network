import React, {useState} from 'react'
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import {NewsArticleType} from '../../../api/apiNews';


export const NewsCard = ({title, description, urlToImage, publishedAt, content}: NewsArticleType) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <Card sx={{width: '100%', mb: '1rem'}}>
            <CardMedia
                component="img"
                height="340"
                image={urlToImage ? urlToImage : ''}
                alt="Photo"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Published:</b> {new Date(publishedAt).toLocaleDateString()}
                </Typography>
                {showMore &&
                    <>
                        <Typography variant="body2" color="text.secondary" sx={{mt: '1rem'}}>
                            {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {content}
                        </Typography>
                    </>
                }
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => setShowMore(prev => !prev)}>Read More</Button>
            </CardActions>
        </Card>
    )
}