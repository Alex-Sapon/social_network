import React, {FC, useEffect} from 'react';
import {Header} from './Header';
import {getAuthUserData} from '../../redux/auth-reducer';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../redux/hooks';
import {useDispatch} from 'react-redux';

export const HeaderContainer: FC = () => {
    const auth = useAppSelector(state => state.auth);
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAuthUserData());

        if (!isAuth) {
            navigate('/login');
        }

    }, [isAuth]);

    return <Header auth={auth}/>
};