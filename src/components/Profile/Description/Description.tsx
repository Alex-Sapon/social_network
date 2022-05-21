import React, {FC} from 'react';
import {Avatar, Box, Typography} from '@mui/material';
import {Preloader} from '../../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profile-reducer';
import {ProfileStatus} from '../ProfileStatus/ProfileStatus';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';

type DescriptionType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

export const Description: FC<DescriptionType> = ({profile, updateStatus, status}) => {
    return (
        <>
            {Object.keys(profile).length === 0
                ? <Preloader/>
                : <Box alignItems="flex-start" sx={{mb: '1.5rem', display: 'flex', alignItems: 'center'}}>
                    <Avatar sx={{mr: '2rem'}} src={profile.photos.small !== null ? profile.photos.small : userAvatar}/>
                    <Box sx={{display: 'flex', flexDirection: 'column', flex: '1 1 auto'}}>
                        <Typography variant={'body2'} sx={{fontSize: '1.4rem', mb: '0.5rem'}}>{profile.fullName}</Typography>
                        <ProfileStatus status={status} updateStatus={updateStatus}/>
                    </Box>
                </Box>}
        </>
    )
};