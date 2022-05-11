import {RootStateType} from '../../redux/redux-store';
import {useSelector} from 'react-redux';
import {addMessage, MessagesType, updateMessage} from '../../redux/messages-reducer';
import {Messages} from './Messages';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

export const MessagesContainer = () => {
    const {messages, newMessage, users} = useSelector<RootStateType, MessagesType>(state => state.messagesPage);
    const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth);

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
