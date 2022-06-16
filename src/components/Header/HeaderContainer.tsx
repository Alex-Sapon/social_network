import React, {FC, useEffect} from 'react';
import {Header} from './Header';
import {getAuthUserData} from '../../redux/reducers/auth-reducer';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';

export const HeaderContainer: FC = () => {
    const dispatch = useAppDispatch();

    const auth = useAppSelector(state => state.auth);
    const isAuth = useAppSelector(state => state.auth.isAuth);


    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAuthUserData());

        if (!isAuth) {
            navigate('/login');
        }

    }, [isAuth]);

    return <Header auth={auth}/>
};