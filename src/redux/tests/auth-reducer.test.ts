import {setAuthUserData, authReducer, AuthStateType} from '../auth-reducer'

test('auth state should be created', () => {
    const initialState: AuthStateType = {
        login: null,
        email: null,
        rememberMe: false,
        userId: 0,
        isAuth: false,
    }

    const endState = authReducer(initialState, setAuthUserData(2, '246hdas3l66', 'rrr@gmail.com', true))

    expect(endState.userId).toBe(2)
    expect(endState.login).toBe('246hdas3l66')
    expect(endState.isAuth).toBeTruthy()
    expect(Object.keys(endState).length).toBe(6)
})
