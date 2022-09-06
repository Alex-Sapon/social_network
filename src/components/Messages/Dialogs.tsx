import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import React, {ComponentType, useEffect} from 'react';
import {useActions, useAppSelector} from '../../assets/utils';
import {Grid, List, Typography} from '@mui/material';
import {Dialog} from './Dialog/Dialog';
import {MessageFormData} from './AddMessageForm';
import {MessageFormDataType} from './AddMessageForm/AddMessageForm';
import {dialogsAsyncActions} from './dialogs-reducer';
import {Preloader} from '../../common/Preloader'
import styles from './Dialogs.module.css';

const DialogsContainer = () => {
    const {fetchDialogs} = useActions(dialogsAsyncActions);

    const dialogs = useAppSelector(state => state.dialogsPage.dialogs);
    const users = useAppSelector(state => state.dialogsPage.users);
    const isLoading = useAppSelector(state => state.dialogsPage.isLoading);

    // useEffect(() => {
    //     const socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    //
    //     // socket.onmessage = ev => {
    //     //
    //     // }
    //
    // }, [])

    const onSubmit = (formData: MessageFormDataType) => {
        const message = formData.messageForm;

        // message && message.trim() !== '' && addMessage(message);
    };

    useEffect(() => {
        fetchDialogs();
    }, [])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className={styles.dialogs_container}>
            {/*<Grid item xs={4}>*/}
            {/*    <List>*/}
            {/*        /!*{users.map(user => <Dialog key={user.id} id={user.id} name={user.name}/>)}*!/*/}
            {/*    </List>*/}
            {/*</Grid>*/}
            <List>
                {dialogs && dialogs.map(dialog => <Dialog key={dialog.id} {...dialog}/>)}
                {/*<MessageFormData onSubmit={onSubmit}/>*/}
            </List>
        </div>
    )
};

export default compose<ComponentType>(withAuthRedirect)(DialogsContainer);
