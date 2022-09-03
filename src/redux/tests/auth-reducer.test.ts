import {getAuthUserData, authReducer, AuthStateType, getCaptchaUrl} from '../../components/Login/auth-reducer';

let initialState: AuthStateType;

beforeEach(() => {
    initialState = {
       authParams: {
           id: 0,
           login: '',
           email: '',
       },
        rememberMe: false,
        captcha: null,
        isAuth: false,
    }
});

test('auth state should be created', () => {
    const authData: AuthStateType = {
        authParams: {
            id: 2,
            login: '246hDaS3l66',
            email: 'rrr@gmail.com',
        },
        captcha: null,
        isAuth: true,
    };

    const endState = authReducer(initialState, getAuthUserData.fulfilled(authData, ''));

    expect(endState.authParams.id).toBe(2);
    expect(endState.authParams.login).toBe('246hDaS3l66');
    expect(endState.authParams.email).toBe('rrr@gmail.com');
    expect(Object.keys(endState).length).toBe(5);
});

test('isAuth of state should be change from false to true', () => {
    const authData: AuthStateType = {
        authParams: {
            id: 0,
            login: '',
            email: '',
        },
        captcha: null,
        isAuth: false,
    };

    const endState = authReducer(initialState, getAuthUserData.fulfilled(authData, ''))

    expect(endState.isAuth).toBeTruthy();
});

test('url of captcha should be set', () => {
    const endState = authReducer(initialState, getCaptchaUrl.fulfilled({url: 'https://fake.com/blabla'}, ''))

    expect(endState.captcha).toBe('https://fake.com/blabla');
});
