import React, {FC} from 'react'
import {Avatar, Box, ListItem, Typography} from '@mui/material'

const Description: FC = () => {
    return (
        <Box>
            <ListItem sx={{p: '0.5rem', mb: '1rem'}}>
                <Avatar sx={{mr: '1rem'}}
                        src={'https://img.freepik.com/free-vector/bearded-man-avatar-man-vector-portrait_9385-36.jpg'}/>
                <Typography sx={{fontSize: '1.5rem'}}>Aleksandr Saponchik</Typography>
            </ListItem>
        </Box>
    )
}

export default Description