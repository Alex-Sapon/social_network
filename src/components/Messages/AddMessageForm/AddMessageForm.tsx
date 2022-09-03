import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

export type MessageFormDataType = {
    messageForm: string
}

const MessageForm = ({handleSubmit}: InjectedFormProps<MessageFormDataType>) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field name="messageForm" component="textarea" type="textarea"/>
            <button>Send message</button>
        </form>
    )
};

export const MessageFormData = reduxForm<MessageFormDataType>({form: 'messageForm'})(MessageForm);
