import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import React, {FC} from 'react';

export type PostFormDataType = {
    post: string
}

const PostForm: FC<InjectedFormProps<PostFormDataType>> = props => {
    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Field name="post" component="input" placeholder="enter new post"/>
            <button>Send post</button>
        </form>
    )
};

export default reduxForm<PostFormDataType>({form: 'postForm'})(PostForm);