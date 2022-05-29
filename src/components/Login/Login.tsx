import {Box, Typography} from '@mui/material';
import {Field, Form, InjectedFormProps, reduxForm} from 'redux-form';
import {FC, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser, logoutUser} from '../../redux/auth-reducer';
import {required} from '../../common/validators';
import {renderField} from '../../common/FormControl';
import {useAppSelector} from '../../redux/hooks';
import {useNavigate} from 'react-router-dom';

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: FC<InjectedFormProps<FormDataType>> = props => {
    const {handleSubmit, error} = props;

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    const inputField = useMemo(() => {
        return renderField('input');
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Field placeholder={'login'} name="login" component={inputField} validate={[required]}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Field
                    placeholder="password"
                    name="password" type="password"
                    component={inputField}
                    validate={[required]}
                />
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '30px'}}>
                <label htmlFor="rememberMe">Remember me</label>
                <Field name="rememberMe" component="input" type="checkbox"/>
            </div>
            {error && <div style={{color: 'red', marginTop: '-20px', marginBottom: '10px'}}>{error}</div>}
            <button type="submit">Log In</button>
            <button type="submit" onClick={handleLogout}>Log Out</button>
        </Form>
    )
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'loginForm'})(LoginForm);

const Login = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (formData: FormDataType) => {
        const {login, password, rememberMe} = formData;

        dispatch(loginUser(login, password, rememberMe));
    }

    return (
        <>
            {!isAuth
                ? <Box sx={{
                    p: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography variant="h4" component="h4" sx={{mb: '2rem'}}>Login</Typography>
                    <LoginReduxForm onSubmit={onSubmit}/>
                </Box>
                : navigate('/profile/:id')}
        </>
    )
};

export default Login;

