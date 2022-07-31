import {Field, Form, InjectedFormProps, reduxForm} from 'redux-form';
import {useAppSelector} from '../../../redux/redux-store';
import styles from './EditProfileForm.module.css';
import {Button} from '@mui/material';
import React from 'react';
import {selectProfile} from '../Profile/Profile';
import {Contact} from '../Contact/Contact';
import {renderCheckbox} from '../../../assets/utils/renderCheckbox';
import {renderTextField} from '../../../assets/utils/renderTextField';

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

const EditProfile = ({handleSubmit}: InjectedFormProps<EditProfileType>) => {
    const {contacts} = useAppSelector(selectProfile);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className={styles.btn}>
                    <Button sx={{ml: 'auto'}} color="inherit" variant="text" type="submit">Send update profile</Button>
                </div>
                <div className={styles.about}><b>About me:</b>
                    <Field name="aboutMe" component={renderTextField}/>
                </div>
                <br/>
                <div className={styles.job}>
                    <Field name="lookingForAJob" component={renderCheckbox} label="Looking for a job"/>
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
                    nameField={`contacts.${contact.toLowerCase()}`}
                    value={contacts[contact as keyof typeof contacts]}
                    className={styles.subtitle}
                />
            )}
            </Form>
        </>
    )
};

export const EditProfileForm = reduxForm<EditProfileType>({form: 'profileForm'})(EditProfile);