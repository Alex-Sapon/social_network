import React, {FC} from 'react'
import {Avatar, Box, ListItem, Typography} from '@mui/material'
import avatar from '../../../img/avatar/avatar.jpg'

const Description: FC = () => {
    return (
        <Box>
            <ListItem sx={{p: '0.5rem', mb: '1rem'}}>
                <Avatar sx={{mr: '1rem'}} src={avatar}/>
                <Typography sx={{fontSize: '1.5rem'}}>Aleksandr Saponchik</Typography>
            </ListItem>
        </Box>
    )
}

export default Description