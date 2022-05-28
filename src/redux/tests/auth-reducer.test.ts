import {setAuthUserData, authReducer, AuthStateType} from '../auth-reducer'

test('auth state should be created', () => {
    const initialState: AuthStateType = {
        login: '',
        email: '',
        rememberMe: false,
        id: 1,
        isAuth: false,
    }

    const endState = authReducer(initialState, setAuthUserData(2, '246hdas3l66', 'rrr@gmail.com', true))

    expect(endState.id).toBe(2)
    expect(endState.login).toBe('246hdas3l66')
    expect(endState.isAuth).toBeTruthy()
    expect(Object.keys(endState).length).toBe(6)
})
