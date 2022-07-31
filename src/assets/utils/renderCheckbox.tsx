import {Checkbox, FormControlLabel} from '@mui/material';
import React from 'react';

export const renderCheckbox = ({input, label}: any) => (
    <div>
        <FormControlLabel
            control={<Checkbox checked={input.value ? true : false} onChange={input.onChange}/>}
            label={label}
        />
    </div>
)