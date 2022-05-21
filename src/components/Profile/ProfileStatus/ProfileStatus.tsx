import {FC, useState} from 'react';
import {TextField} from '@mui/material';

type ProfileStatusType = {
    status: string
}

export const ProfileStatus: FC<ProfileStatusType> = ({status}) => {
    const [editMode, setEditMode] = useState(false);
    const [] = useState(status);

    const activateMode = () => {
        setEditMode(true);
    }

    const deactivateMode = () => {
        setEditMode(false);
    }

  return (
      <div>
          {!editMode
              ? <span onDoubleClick={activateMode}>{status === null ? 'No status' : status}</span>
              : <TextField
                  autoFocus
                  size={'small'}
                  variant={'filled'}
                  value={status}
                  onBlur={deactivateMode}
              />
          }
      </div>
  )
}