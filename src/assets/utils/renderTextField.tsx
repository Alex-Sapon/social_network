import {TextField} from '@mui/material';
import React from 'react';

export const renderTextField = ({label, input, meta: {touched, invalid, error}, ...custom}: any) => (
    <TextField
        size="small"
        variant="standard"
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)