import React from 'react'
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {NewsArticleType} from '../../../api/apiNews';


export const NewsCard = ({title, description, urlToImage, publishedAt}: NewsArticleType) => {
    return (
        <Card sx={{width: '100%', mb: '2rem'}}>
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
                <Typography variant="body2" color="text.secondary" sx={{mb: '1rem'}}>
                    <b>Published:</b> {new Date(publishedAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Read More</Button>
            </CardActions>
        </Card>
    )
}