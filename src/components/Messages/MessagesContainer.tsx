import {RootStateType} from '../../redux/redux-store';
import {useSelector} from 'react-redux';
import {addMessage, MessagesType, updateMessage} from '../../redux/messages-reducer';
import {Messages} from './Messages';

export const MessagesContainer = () => {
    const {messages, newMessage, users} = useSelector<RootStateType, MessagesType>(state => state.messagesPage);

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
