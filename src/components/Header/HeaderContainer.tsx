import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {AuthType, setAuthUserData} from '../../redux/auth-reducer'
import {RootStateType} from '../../redux/redux-store'
import {Header} from './Header'
import axios from 'axios';

export type HeaderContainerType = {
    setAuthUserData: (id: number, login: string, email: string) => void
    auth?: AuthType
}

const HeaderContainer = (props: HeaderContainerType) => {
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    const {id, login, email} = response.data.data
                    props.setAuthUserData(id, login, email)
                }
            })
    }, [])

    return <Header {...props}/>
}

const mapStateToProps = (state: RootStateType) => ({
    id: state.auth.id,
    login: state.auth.login,
    email: state.auth.email,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)