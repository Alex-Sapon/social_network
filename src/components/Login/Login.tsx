import {Box, Button, Typography} from '@mui/material';
import {Field, Form, InjectedFormProps, reduxForm} from 'redux-form';
import {FC, useEffect, useMemo} from 'react';
import {login} from '../../redux/reducers/auth-reducer';
import {required} from '../../common/validators';
import {renderField} from '../../common/FormControl';
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from '../../enums/path';
import {useAppDispatch, useAppSelector} from '../../redux/redux-store';

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: FC<InjectedFormProps<FormDataType>> = props => {
    const {handleSubmit, error} = props;

    const inputField = useMemo(() => {
        return renderField('input');
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Field placeholder="email" name="email" component={inputField} validate={[required]}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Field
                    placeholder="password"
                    name="password"
                    type="password"
                    component={inputField}
                    validate={[required]}
                />
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '30px'}}>
                <label htmlFor="rememberMe">Remember me</label>
                <Field name="rememberMe" component="input" type="checkbox"/>
            </div>
            {error && <div style={{color: 'red', marginTop: '-20px', marginBottom: '10px'}}>{error}</div>}
            <Button type="submit" variant="contained">Log In</Button>
        </Form>
    )
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'loginForm'})(LoginForm);

const Login = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const {isAuth, id} = useAppSelector(state => state.auth);

    const onSubmit = (data: FormDataType) => {
        dispatch(login(data));
    }

    useEffect(() => {
        if (isAuth) navigate(`/profile/${id}`);
    }, []);

    return (
        <Box sx={{
            p: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant="h4" component="h4" sx={{mb: '2rem'}}>Login</Typography>
            <LoginReduxForm onSubmit={onSubmit}/>
        </Box>
    )
};

export default Login;

