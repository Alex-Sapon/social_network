import {FC, useState} from 'react';
import {TextField} from '@mui/material';

type ProfileStatusType = {
    status: string
}

export const ProfileStatus: FC<ProfileStatusType> = ({status}) => {
    const [editMode, setEditMode] = useState(false);

    const onDoubleClickHandler = () => {
        setEditMode(true);
    }

    const onBlurHandler = () => {
        setEditMode(false);
    }

  return (
      <div>
          {!editMode
              ? <span onDoubleClick={onDoubleClickHandler}>{status}</span>
              : <TextField
                  autoFocus
                  size={'small'}
                  variant={'filled'}
                  value={status}
                  onBlur={onBlurHandler}
              />
          }
      </div>
  )
}