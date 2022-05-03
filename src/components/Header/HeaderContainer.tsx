import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {RootStateType} from '../../redux/redux-store';
import {Header} from './Header';
import {getAuthUserData} from '../../redux/auth-reducer';

type MapStatePropsType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
};
type MapDispatchPropsType = {
    getAuthUserData: () => void
};

export type HeaderContainerType = MapStatePropsType & MapDispatchPropsType

const HeaderContainer: FC<HeaderContainerType> = props => {
    const {getAuthUserData} = props;

    useEffect(() => {
        getAuthUserData();
    }, [getAuthUserData]);

    return <Header {...props}/>
};

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    id: state.auth.id,
    login: state.auth.login,
    email: state.auth.email,
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);