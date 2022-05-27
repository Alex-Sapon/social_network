import {Box, Typography} from '@mui/material';
import {Field, Form, InjectedFormProps, reduxForm} from 'redux-form';
import {FC} from 'react';
import {useDispatch} from 'react-redux';
import {getLoginUserData} from '../../redux/auth-reducer';

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="login">Login</label>
                <Field name="login" component="input" type="text"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Field name="password" component="input" type="text"/>
            </div>
            <div>
                <label htmlFor="rememberMe">Remember me</label>
                <Field name="rememberMe" component="input" type="checkbox"/>
            </div>
            <button type={'submit'}>Submit</button>
        </Form>
    )
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm);

const Login = () => {
    const dispatch = useDispatch();

    const onSubmit = (formData: FormDataType) => {
        const {login, password, rememberMe} = formData;

        dispatch(getLoginUserData(login, password, rememberMe, false));
    }

    return (
        <Box sx={{p: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant="h4" component="h4" sx={{mb: '2rem'}}>Login</Typography>
            <LoginReduxForm onSubmit={onSubmit}/>
        </Box>
    )
};

export default Login;