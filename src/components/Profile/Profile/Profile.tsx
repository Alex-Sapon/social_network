import React, {ChangeEvent, useRef, useState} from 'react';
import {Avatar, Button, IconButton, Typography} from '@mui/material';
import {setPhoto} from '../../../redux/reducers/profile-reducer';
import {ProfileStatus} from '../ProfileStatus/ProfileStatus';
import userAvatar from '../../../assets/img/avatar/avatar.jpg';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Badge from '@mui/material/Badge';
import styles from './Profile.module.css';
import {useParams} from 'react-router';
import {AppStateType, useAppDispatch, useAppSelector} from '../../../redux/redux-store';
import {logout} from '../../../redux/reducers/auth-reducer';
import {Form, InjectedFormProps, reduxForm} from 'redux-form';

export const selectProfile = (state: AppStateType) => state.profilePage.profile;
export const selectStatus = (state: AppStateType) => state.profilePage.status;

export const Profile = () => {
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState(false);

    const {id} = useParams<{ id: string }>();

    const {fullName, photos} = useAppSelector(selectProfile);
    const userId = useAppSelector(state => state.auth.id);
    const status = useAppSelector(selectStatus);

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

    const handleLogout = () => dispatch(logout());

    const handleEditProfile = () => {
        setEditMode(true);
    }

    const handleSendUpdateProfile = () => {
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
                    src={photos ? photos.small : userAvatar}
                />
            </Badge>
            <div className={styles.description}>
                <div className={styles.name}>
                    <Typography variant="body2" sx={{fontSize: '1.4rem', mb: '0.5rem'}}>{fullName}</Typography>
                    {isShowBtn && <Button color="inherit" variant="text" onClick={handleLogout}>Log out</Button>}
                </div>
                <ProfileStatus status={status} isShowBtn={isShowBtn}/><br/>
                {isShowBtn &&
                    <div className={styles.btn}>
                        <Button
                            sx={{ml: 'auto'}}
                            color="inherit"
                            variant="text"
                            onClick={!editMode ? handleEditProfile : handleSendUpdateProfile}
                        >{!editMode ? 'Edit profile' : 'Send update profile'}</Button>
                    </div>}
                <div>{!editMode ? <ViewProfile/> : <EditProfileForm/>}</div>
            </div>
        </div>
    )
};

type ContactType = {
    title: string
    value: string | null
    className: string
}

export const Contact = ({title, value, className}: ContactType) => {
    return (
        <div className={className}><b>{title}:</b> {value}</div>
    )
};

type ViewProfile = {}

export const ViewProfile = () => {
    const {contacts, lookingForAJob, lookingForAJobDescription} = useAppSelector(selectProfile);

    return (
        <>
            <div className={styles.job}>
                Looking for a job:
                {lookingForAJob ? <CheckIcon sx={{color: 'green'}}/> : <DangerousIcon sx={{color: 'red'}}/>}
            </div>
            <br/>
            <div className={styles.job_description}>
                Looking for a job description: {lookingForAJobDescription}
            </div>
            <br/>
            Contacts: {contacts && Object.keys(contacts).map(contact =>
            <Contact
                key={contact}
                title={contact}
                value={contacts[contact as keyof typeof contacts]}
                className={styles.contact}
            />
        )}
        </>
    )
};

type EditProfile = {}

export const EditProfile = ({handleSubmit}: InjectedFormProps<EditProfile>) => {
    return (
        <Form onSubmit={handleSubmit}>
            Hello
        </Form>
    )
};

const EditProfileForm = reduxForm<EditProfile>({form: 'profileForm'})(EditProfile);

