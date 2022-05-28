import {Box, Typography} from '@mui/material';
import {Field, Form, InjectedFormProps, reduxForm} from 'redux-form';
import {FC, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {getLoginUserData, getLogoutUser} from '../../redux/auth-reducer';
import {maxLength, minLength, required} from '../../common/validators';
import {renderField} from '../../common/FormControl';

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(getLogoutUser());
    }

    const inputField = useMemo(() => renderField('input'), []);

    const maxLength10 = useMemo(() => maxLength(10), []);

    const minLength5 = useMemo(() => minLength(5), []);

    return (
        <Form onSubmit={handleSubmit}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="login">Login</label>
                <Field
                    placeholder={'login'}
                    name="login"
                    component={inputField}
                    validate={[required, maxLength10, minLength5]}
                />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="password">Password</label>
                <Field
                    placeholder={'password'}
                    name="password"
                    component={inputField}
                    validate={[required, maxLength10, minLength5]}
                />
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <label htmlFor="rememberMe">Remember me</label>
                <Field name="rememberMe" component="input" type="checkbox"/>
            </div>
            <button type="submit">Log In</button>
            <button type="submit" onClick={handleLogout}>Log Out</button>
        </Form>
    )
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'loginForm'})(LoginForm);

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