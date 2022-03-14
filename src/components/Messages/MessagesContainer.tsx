import React, {FC} from 'react'

import {addMessageActionCreator, updateMessageActionCreator} from '../../redux/messages-reducer'
import {StoreType} from '../../redux/redux-store'
import StoreContext from '../../StoreContext';
import Messages from './Messages';

type MessagesType = {
    store: StoreType
}

const MessagesContainer: FC = () => {
    return (
        <StoreContext.Consumer>
            {store => {
                const addMessage = () => store.dispatch(addMessageActionCreator())
                const onMessageChange = (message: string) => store.dispatch(updateMessageActionCreator(message))
                return (
                    <Messages
                        messages={store.getState().messagesPage.messages}
                        newMessage={store.getState().messagesPage.newMessage}
                        users={store.getState().messagesPage.users}
                        addMessageActionCreator={addMessage}
                        updateMessageActionCreator={onMessageChange}
                    />
                )
            }}
        </StoreContext.Consumer>
    )
}

export default MessagesContainer