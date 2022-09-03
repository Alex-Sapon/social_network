import {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {profileAsyncActions} from '../profile-reducer';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import styles from './ProfileStatus.module.css';
import {useActions} from '../../../assets/utils';

type ProfileStatusType = {
    status: string
    isShowBtn: boolean
}

export const ProfileStatus = ({status, isShowBtn}: ProfileStatusType) => {
    const {updateStatus} = useActions(profileAsyncActions);

    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(status);

    const activateMode = () => {
        setEditMode(true);
        setValue(status);
    }

    const deactivateMode = () => {
        setEditMode(false);
        updateStatus(value);
    }

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode
                ? <div className={styles.view}>
                    <span>{status ? status : 'No status'}</span>
                    {isShowBtn && <IconButton onClick={activateMode}><ModeEditIcon/></IconButton>}
                </div>
                : <TextField
                    autoFocus
                    size='small'
                    variant='standard'
                    value={value}
                    onChange={changeValueHandler}
                    onBlur={deactivateMode}
                    sx={{background: 'inherit', color: 'inherit', width: '100%'}}
                />}
        </div>
    )
};