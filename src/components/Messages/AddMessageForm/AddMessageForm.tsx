import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

export type MessageFormDataType = {
    messageForm: string
}

const MessageForm: FC<InjectedFormProps<MessageFormDataType>> = props => {
    const {handleSubmit} = props;

    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <Field
                name="messageForm"
                component="textarea"
                type="textarea"
                style={{marginBottom: '1rem'}}
            />
            <button>Send message</button>
        </form>
    )
};

export default reduxForm<MessageFormDataType>({form: 'messageForm'})(MessageForm);
