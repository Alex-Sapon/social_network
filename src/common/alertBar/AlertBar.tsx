import * as React from 'react';
import {useEffect, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const AlertBar = ({error}: { error: string | null }) => {
    const [isOpen, setIsOpen] = useState(error);

    console.log(error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(null);
    };

    useEffect(() => {
        setIsOpen(error);
    }, [error])

    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={!!isOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            sx={{position: 'absolute', top: '3rem'}}
        >
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>{error}</Alert>
        </Snackbar>
    );
}