import {addMessage, updateMessage} from '../../redux/messages-reducer';
import {Messages} from './Messages';
import {useAppSelector} from '../../redux/hooks';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {ComponentType} from 'react';

const MessagesContainer = () => {
    const messages = useAppSelector(state => state.messagesPage.messages);
    const newMessage = useAppSelector(state => state.messagesPage.newMessage);
    const users = useAppSelector(state => state.messagesPage.users);

    return (
        <Messages
            messages={messages}
            newMessage={newMessage}
            users={users}
            addMessage={addMessage}
            updateMessage={updateMessage}
        />
    )
};

export default compose<ComponentType>(
    withAuthRedirect,
)(MessagesContainer);
