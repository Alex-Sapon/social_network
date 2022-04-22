import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {setAuthUserData} from '../../redux/auth-reducer'
import {RootStateType} from '../../redux/redux-store'
import {Header} from './Header'
import { usersAPI } from '../../API/api'

type MapDispatchPropsType = {
    setAuthUserData: (id: number, login: string, email: string) => void
}
type MapStatePropsType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

export type HeaderContainerType = MapStatePropsType & MapDispatchPropsType

const HeaderContainer = (props: HeaderContainerType) => {
    useEffect(() => {
        usersAPI.setAuthUser().then(response => {
                if (response.data.resultCode === 0) {
                    const {id, login, email} = response.data.data
                    props.setAuthUserData(id, login, email)
                }
            })
    }, [])

    return <Header {...props}/>
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    id: state.auth.id,
    login: state.auth.login,
    email: state.auth.email,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)