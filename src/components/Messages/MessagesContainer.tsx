import {addMessage, updateMessage} from '../../redux/messages-reducer';
import {Messages} from './Messages';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useAppSelector} from '../../redux/hooks';

export const MessagesContainer = () => {
    const {messages, newMessage, users} = useAppSelector(state => state.messagesPage);
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        };
    }, [isAuth]);

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
