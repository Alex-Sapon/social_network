import {Field, Form, InjectedFormProps, reduxForm} from 'redux-form';
import {useAppSelector} from '../../../redux/redux-store';
import styles from '../Profile/Profile.module.css';
import {Button} from '@mui/material';
import React from 'react';
import {selectProfile} from '../Profile/Profile';
import {Contact} from '../Contact/Contact';
import {log} from 'util';

export type EditProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
}

const EditProfile = ({handleSubmit, error}: InjectedFormProps<EditProfileType>) => {
    const {contacts} = useAppSelector(selectProfile);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className={styles.btn}>
                    <Button sx={{ml: 'auto'}} color="inherit" variant="text" type="submit">Send update profile</Button>
                </div>
                <div className={styles.job}>
                    <b>About me:</b>
                    <Field name="aboutMe" component="input"/>
                </div>
                <br/>
                <div className={styles.job}>
                    <b>Looking for a job:</b>
                    <Field name="lookingForAJob" component="input" type="checkbox"/>
                </div>
                <br/>
                <div className={styles.job_description}><b>My skills:</b></div>
                <Field name="lookingForAJobDescription" component="textarea"/>
                <br/>
                Contacts: {contacts && Object.keys(contacts).map(contact =>
                <Contact
                    key={contact}
                    title={contact}
                    isEdit={true}
                    nameField={'contacts.' + contact}
                    value={contacts[contact as keyof typeof contacts]}
                    className={styles.contact}
                />
            )}
            </Form>
            {console.log(error)}
            {error && <div style={{color: 'red', marginTop: '-20px', marginBottom: '10px'}}>{error}</div>}
        </>
    )
};

export const EditProfileForm = reduxForm<EditProfileType>({form: 'profileForm'})(EditProfile);