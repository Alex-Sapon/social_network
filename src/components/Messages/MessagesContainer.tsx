import {RootStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';

import {addMessage, updateMessage} from '../../redux/messages-reducer'
import Messages from './Messages';

const mapStateToProps = (state: RootStateType) => {
    return {
        messages: state.messagesPage.messages,
        newMessage: state.messagesPage.newMessage,
        users: state.messagesPage.users
    }
}

export default connect(mapStateToProps, {addMessage, updateMessage})(Messages)
