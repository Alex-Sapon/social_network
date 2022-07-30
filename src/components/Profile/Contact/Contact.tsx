import React from 'react';
import {Field} from 'redux-form';

type ContactType = {
    title: string
    value: string | null
    className: string
    isEdit?: boolean
    nameField?: string
}

export const Contact = ({title, value, isEdit, nameField, className}: ContactType) => {
    return (
        <div className={className}><b>{title}:</b>
            {isEdit ? <Field name={nameField} component="input"/> : value}
        </div>
    )
};