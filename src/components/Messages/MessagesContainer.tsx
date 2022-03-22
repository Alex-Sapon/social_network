import React, {Dispatch} from 'react'
import {RootStateProps} from '../../redux/redux-store';
import {connect} from 'react-redux';

import {addMessageActionCreator, MessageDispatchProps, updateMessageActionCreator} from '../../redux/messages-reducer'
import Messages from './Messages';

const mapStateToProps = (state: RootStateProps) => {
    return {
        messages: state.messagesPage.messages,
        newMessage: state.messagesPage.newMessage,
        users: state.messagesPage.users
    }
}

const mapDispatchTopProps = (dispatch: Dispatch<MessageDispatchProps>) => {
    return {
        addMessage: () => dispatch(addMessageActionCreator()), // диспатчит результат action creator
        updateMessage: (message: string) => dispatch(updateMessageActionCreator(message))
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(Messages)
