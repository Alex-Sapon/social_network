import {addMessage} from '../../redux/reducers/messages-reducer';
import {Messages} from './Messages';
import {useAppSelector} from '../../redux/hooks';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {ComponentType} from 'react';

const MessagesContainer = () => {
    const messages = useAppSelector(state => state.messagesPage.messages);
    const users = useAppSelector(state => state.messagesPage.users);

    return <Messages messages={messages} users={users} addMessage={addMessage}/>
};

export default compose<ComponentType>(
    withAuthRedirect,
)(MessagesContainer);
