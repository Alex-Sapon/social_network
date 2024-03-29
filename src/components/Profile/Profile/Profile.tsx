import React, {ChangeEvent, useRef, useState} from 'react';
import {Avatar, Button, IconButton, Typography} from '@mui/material';
import {profileAsyncActions} from '../profile-reducer';
import {ProfileStatus} from '../ProfileStatus';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import styles from './Profile.module.css';
import {useParams} from 'react-router';
import {authAsyncActions, selectAuthId} from '../../Login';
import {ViewProfile} from '../ViewProfile';
import {EditProfileForm, EditProfileType} from '../EditProfileForm';
import {selectProfile, selectProfileStatus} from '../selectors';
import {useActions, useAppSelector} from '../../../assets/utils';

export const Profile = () => {
    const {setPhoto, updateProfile} = useActions(profileAsyncActions);
    const {logout} = useActions(authAsyncActions);

    const [editMode, setEditMode] = useState(false);

    const {id} = useParams<{ id: string }>();

    const profile = useAppSelector(selectProfile);
    const userId = useAppSelector(selectAuthId);
    const status = useAppSelector(selectProfileStatus);

    const ref = useRef<HTMLInputElement>(null);

    const addPhoto = () => {
        ref && ref.current && ref.current.click();
    }

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        const photo = e.target.files && e.target.files[0];

        if (photo) {
            setPhoto(photo);
        }
    }

    const handleEditProfile = () => {
        setEditMode(true);
    }

    const handleSubmitProfile = (data: EditProfileType) => {
        updateProfile(data);
        setEditMode(false);
    }

    const isShowBtn = userId === Number(id);

    return (
        <div className={styles.wrapper}>
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
                badgeContent={isShowBtn && <IconButton onClick={addPhoto}><AddAPhotoIcon/></IconButton>}
            >
                <Avatar
                    variant="square"
                    sx={{width: 70, height: 70, borderRadius: '100%'}}
                    src={profile.photos ? profile.photos.small : userAvatar}
                />
            </Badge>
            <div className={styles.description}>
                <div className={styles.name}>
                    <Typography sx={{fontSize: '1.4rem', mb: '0.5rem'}}>{profile.fullName}</Typography>
                    {isShowBtn && <Button color="inherit" variant="text" onClick={() => logout()}>
                        <LogoutIcon sx={{mr: '5px'}}/>Logout</Button>}
                </div>
                <ProfileStatus status={status} isShowBtn={isShowBtn}/><br/>
                {editMode
                    ? <EditProfileForm initialValues={profile} onSubmit={handleSubmitProfile}/>
                    : <ViewProfile isShowBtn={isShowBtn} onEdit={handleEditProfile}/>}
            </div>
        </div>
    )
};
