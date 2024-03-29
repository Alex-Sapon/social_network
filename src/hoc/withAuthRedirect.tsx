import {useNavigate} from 'react-router-dom';
import {AppStateType} from '../components/App/redux-store';
import {connect} from 'react-redux';
import {ComponentType, useEffect} from 'react';
import {PATH} from '../enums/path';

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
});

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsType) => {
        const {isAuth, ...restProps} = props;

        const navigate = useNavigate();

        useEffect(() => {
            if (!isAuth) {
                return navigate(PATH.LOGIN)
            }
        }, [isAuth, navigate])

        return <Component {...restProps as T}/>;
    }

    return connect(mapStateToProps, {})(RedirectComponent);
}