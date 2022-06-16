import React, {memo} from 'react';
import {Avatar, Box, Typography} from '@mui/material';
import {ProfileType} from '../../../redux/reducers/profile-reducer';
import {ProfileStatus} from '../ProfileStatus/ProfileStatus';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';

type DescriptionType = {
    profile: ProfileType
    status: string
}

export const Description = memo(({profile, status}: DescriptionType) => {
    return (
        <Box alignItems="flex-start" sx={{mb: '1.5rem', display: 'flex', alignItems: 'center'}}>
            <Avatar
                variant="square"
                sx={{mr: '2rem', width: 60, height: 60}}
                src={profile.photos.small !== null ? profile.photos.small : userAvatar}
            />
            <Box sx={{display: 'flex', flexDirection: 'column', flex: '1 1 auto'}}>
                <Typography variant={'body2'}
                            sx={{fontSize: '1.4rem', mb: '0.5rem'}}>{profile.fullName}</Typography>
                <ProfileStatus status={status}/>
            </Box>
        </Box>
    )
});