import React, {FC} from "react";

//** Styles from MUI **//
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

const News = () => {
    return (
        <Card sx={{maxWidth: 345, height: 330}}>
            <CardMedia
                component="img"
                height="140"
                image="https://media.istockphoto.com/photos/iguana-picture-id146059113?k=20&m=146059113&s=612x612&w=0&h=zUZsfGlsb2wR488nqBZwgg6OzVB4yaH__L8QjNmoQ58="
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default News;