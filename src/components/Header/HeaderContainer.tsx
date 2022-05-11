import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/redux-store';
import {Header} from './Header';
import {AuthStateType, getAuthUserData} from '../../redux/auth-reducer';
import {useNavigate} from 'react-router-dom';

export const HeaderContainer: FC = () => {
    const auth = useSelector<RootStateType, AuthStateType>(state => state.auth);
    const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAuthUserData());
        if (!isAuth) {
            navigate('/login');
        };
    }, [isAuth]);

    return <Header auth={auth}/>
};