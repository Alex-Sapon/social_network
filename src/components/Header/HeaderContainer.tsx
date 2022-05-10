import React, {FC, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/redux-store';
import {Header} from './Header';
import {AuthStateType, getAuthUserData} from '../../redux/auth-reducer';

export const HeaderContainer: FC = () => {
    const auth = useSelector<RootStateType, AuthStateType>(store => store.auth);

    useEffect(() => {
        getAuthUserData();
    }, [getAuthUserData]);

    return <Header auth={auth}/>
};