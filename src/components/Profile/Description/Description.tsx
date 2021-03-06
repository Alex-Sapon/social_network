import React, {ChangeEvent, memo, useRef} from 'react';
import {Avatar, Box, IconButton, Typography} from '@mui/material';
import {setPhoto} from '../../../redux/reducers/profile-reducer';
import {ProfileStatus} from '../ProfileStatus/ProfileStatus';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Badge from '@mui/material/Badge';
import {useParams} from 'react-router';
import {IProfile} from '../../../api/api';
import {useAppDispatch, useAppSelector} from '../../../redux/redux-store';

type DescriptionType = {
    profile: IProfile
    status: string
}

export const Description = memo(({profile, status}: DescriptionType) => {
    const dispatch = useAppDispatch();

    const {id} = useParams<{ id: string }>();

    const userId = useAppSelector(state => state.auth.id);

    const ref = useRef<HTMLInputElement>(null);

    const addPhoto = () => {
        ref && ref.current && ref.current.click();
    }

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        const photo = e.target.files && e.target.files[0];

        if (photo) {
            dispatch(setPhoto(photo));
        }
    }

    const showBtn = userId === Number(id);

    return (
        <Box alignItems="flex-start" sx={{mb: '1.5rem', display: 'flex', alignItems: 'center'}}>
            <input
                ref={ref}
                type="file"
                multiple
                onChange={upload}
                accept=".jpg, .jpeg, .png"
                style={{display: 'none'}}
            />
            <Badge
                sx={{mr: '2rem'}}
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                badgeContent={showBtn && <IconButton onClick={addPhoto}><AddAPhotoIcon/></IconButton>}
            >
                <Avatar
                    variant="square"
                    sx={{width: 70, height: 70, borderRadius: '100%'}}
                    src={profile.photos ? profile.photos.small : userAvatar}
                />
            </Badge>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: '1 1 auto'}}>
                <Typography variant='body2' sx={{fontSize: '1.4rem', mb: '0.5rem'}}>
                    {profile.fullName}
                </Typography>
                <ProfileStatus status={status}/>
            </Box>
        </Box>
    )
});