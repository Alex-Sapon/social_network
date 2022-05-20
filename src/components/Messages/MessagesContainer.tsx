import {addMessage, updateMessage} from '../../redux/messages-reducer';
import {Messages} from './Messages';
import {useAppSelector} from '../../redux/hooks';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

export const MessagesContainer = withAuthRedirect(() => {
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
});
