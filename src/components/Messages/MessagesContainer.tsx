import React, {FC} from 'react'

import {addMessageActionCreator, updateMessageActionCreator} from '../../redux/messages-reducer'
import {StoreType} from '../../redux/redux-store'
import Messages from './Messages';

type MessagesType = {
    store: StoreType
}

const MessagesContainer: FC<MessagesType> = (props) => {
    const addMessage = () => props.store.dispatch(addMessageActionCreator())

    const onMessageChange = (message: string) => props.store.dispatch(updateMessageActionCreator(message))

    return (
        <Messages
            messages={props.store.getState().messagesPage.messages}
            newMessage={props.store.getState().messagesPage.newMessage}
            users={props.store.getState().messagesPage.users}
            addMessageActionCreator={addMessage}
            updateMessageActionCreator={onMessageChange}
        />
    )
}

export default MessagesContainer