import React, {FC} from 'react';
import styles from './Message.module.css';

export interface IUserMessage {
    message: string;
}

const Message: FC<IUserMessage> = ({message}) => {
    return (
        <p>{message}</p>
    )
}

export default Message;