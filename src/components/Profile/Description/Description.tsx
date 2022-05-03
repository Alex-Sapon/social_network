import React, {FC} from 'react';
import {Avatar, Box, ListItem, Typography} from '@mui/material';
import {Preloader} from '../../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profile-reducer';

type DescriptionType = {
    profile: ProfileType
};

export const Description: FC<DescriptionType> = ({profile}) => {
    return (
        <Box>
            {Object.keys(profile).length === 0
                ? <Preloader/>
                : <ListItem sx={{p: '0.5rem', mb: '1rem'}}>
                    <Avatar sx={{mr: '1rem'}} src={profile.photos.small}/>
                    <Typography sx={{fontSize: '1.5rem'}}>{profile.fullName}</Typography>
                </ListItem>}
        </Box>
    )
};