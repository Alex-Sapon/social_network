import {Box, Button, Typography} from '@mui/material';
import {Field, Form, InjectedFormProps, reduxForm} from 'redux-form';
import {useEffect, useMemo} from 'react';
import {login} from './auth-reducer';
import {required} from '../../common/validators';
import {renderField} from '../../common/FormControl';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/redux-store';
import {renderCheckbox} from '../../assets/utils/renderCheckbox';
import {selectAuthCaptcha, selectAuthId, selectIsAuth} from './selectors';

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: null | string
}

const LoginForm = ({handleSubmit, error}: InjectedFormProps<FormDataType>) => {
    const inputField = useMemo(() => {
        return renderField('input');
    }, []);

    const captcha = useAppSelector(selectAuthCaptcha);

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
                <Field name="rememberMe" component={renderCheckbox} label="Remember me"/>
            </div>
            {captcha && <div>
                <img src={captcha} alt="Captcha"/>
                <Field name="captcha" component={inputField}/>
            </div>}
            {error && <div style={{color: 'red', marginTop: '-20px', marginBottom: '10px'}}>{error}</div>}
            <Button type="submit" variant="contained">Log In</Button>
        </Form>
    )
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'loginForm'})(LoginForm);

export const Login = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const id = useAppSelector(selectAuthId);
    const isAuth = useAppSelector(selectIsAuth);

    const onSubmit = (data: FormDataType) => {
        dispatch(login(data));
    }

    useEffect(() => {
        if (isAuth) {
            navigate(`/profile/${id}`);
        }
    }, [isAuth, id, navigate]);

    return (
        <Box sx={{p: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant="h4" component="h4" sx={{mb: '2rem'}}>Login</Typography>
            <LoginReduxForm onSubmit={onSubmit}/>
        </Box>
    )
};

