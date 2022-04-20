import {RootStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';

import {addMessage, MessagesType, updateMessage, UsersType} from '../../redux/messages-reducer'
import {Messages} from './Messages';

type MessagesContainerType = {
    users: Array<UsersType>
    messages: Array<MessagesType>
    newMessage: string
    addMessage: () => void
    updateMessage: (message: string) => void
}

const MessagesContainer = (props: MessagesContainerType) => {
    return <Messages {...props}/>
}

const mapStateToProps = (state: RootStateType) => {
    return {
        messages: state.messagesPage.messages,
        newMessage: state.messagesPage.newMessage,
        users: state.messagesPage.users
    }
}

export default connect(mapStateToProps, {addMessage, updateMessage})(MessagesContainer)
