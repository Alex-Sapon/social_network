import React, {Dispatch} from 'react'
import {RootDispatchProps, RootStateProps} from '../../redux/redux-store';
import {connect} from 'react-redux';

import {addMessageActionCreator, updateMessageActionCreator} from '../../redux/messages-reducer'
import Messages from './Messages';

const mapStateToProps = (state: RootStateProps) => {
    return {
        messages: state.messagesPage.messages,
        newMessage: state.messagesPage.newMessage,
        users: state.messagesPage.users
    }
}

const mapDispatchTopProps = (dispatch: Dispatch<RootDispatchProps>) => {
    return {
        addMessage: () => dispatch(addMessageActionCreator()),
        updateMessage: (message: string) => dispatch(updateMessageActionCreator(message))
    }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchTopProps)(Messages)

export default MessagesContainer