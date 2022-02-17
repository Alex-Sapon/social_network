import React, {FC} from 'react';
import styles from './Messages.module.css';
import Message, {IUserMessage} from './Message/Message';
import DialogUser from "./DialogUser/DialogUser";


const Messages: FC = () => {
    return (
        <div className={styles.dialogs}>
            <h2 className={styles.title}>Messages</h2>
            <ul className={styles.list}>
                {props.users.map((user) => <DialogUser key={user.id} id={user.id} name={user.name}/>)}
            </ul>
            <div className={styles.messages}>
                {props.messages.map((text, key) => <Message key={key} message={text.message}/>)}
            </div>
        </div>
    )
}

export default Messages;