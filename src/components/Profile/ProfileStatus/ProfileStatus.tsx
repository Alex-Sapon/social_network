import {ChangeEvent, FC, useState} from 'react';
import {TextField} from '@mui/material';
import {useAppDispatch} from '../../../redux/hooks';
import {updateStatus} from '../../../redux/reducers/profile-reducer';

type ProfileStatusType = {
    status: string
}

export const ProfileStatus: FC<ProfileStatusType> = ({status}) => {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(status);

    const dispatch = useAppDispatch();

    const activateMode = () => {
        setEditMode(true);
    }

    const deactivateMode = () => {
        setEditMode(false);
        dispatch(updateStatus(value));
    }

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode
                ? <span onDoubleClick={activateMode}>{status !== null ? status : 'No status'}</span>
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