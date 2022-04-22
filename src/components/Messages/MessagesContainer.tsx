import {RootStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';

import {addMessage, MessagesType, updateMessage, UsersType} from '../../redux/messages-reducer'
import {Messages} from './Messages';

type MapStatePropsType = {
    users: Array<UsersType>
    messages: Array<MessagesType>
    newMessage: string
}
type MapDispatchPropsType = {
    addMessage: () => void
    updateMessage: (message: string) => void
}

export type MessagesContainerType = MapStatePropsType & MapDispatchPropsType

const MessagesContainer = (props: MessagesContainerType) => {
    return <Messages {...props}/>
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
    return {
        messages: state.messagesPage.messages,
        newMessage: state.messagesPage.newMessage,
        users: state.messagesPage.users
    }
}

export default connect(mapStateToProps, {addMessage, updateMessage})(MessagesContainer)
