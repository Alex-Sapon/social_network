import {useAppSelector} from '../../../redux/redux-store';
import styles from './ViewProfile.module.css';
import {Button} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
import React from 'react';
import {selectProfile} from '../Profile/Profile';
import {Contact} from '../Contact/Contact';

type ViewProfile = {
    isShowBtn: boolean
    onEdit: () => void
}

export const ViewProfile = ({isShowBtn, onEdit}: ViewProfile) => {
    const {contacts, lookingForAJob, lookingForAJobDescription, aboutMe} = useAppSelector(selectProfile);

    return (
        <div>
            {isShowBtn &&
                <div className={styles.btn}>
                    <Button sx={{ml: 'auto'}} color="inherit" variant="text" onClick={onEdit}>Edit profile</Button>
                </div>}
            <div className={styles.about}><b>About me:</b> {aboutMe}</div>
            <br/>
            <div className={styles.job}><b>Looking for a job: </b>
                {lookingForAJob ? <CheckIcon sx={{color: 'green'}}/> : <DangerousIcon sx={{color: 'red'}}/>}
            </div>
            <br/>
            <div className={styles.job_description}><b>My skills:</b> {lookingForAJobDescription}</div>
            <br/>
            Contacts: {contacts && Object.keys(contacts).map(contact =>
            <Contact
                key={contact}
                title={contact}
                value={contacts[contact as keyof typeof contacts]}
                className={styles.subtitle}
            />
        )}
        </div>
    )
};