import {useNavigate} from 'react-router-dom';
import {AppStateType} from '../redux/redux-store';
import {connect} from 'react-redux';
import {ComponentType, useEffect} from 'react';

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
                navigate('/login');
            }
        }, [isAuth])

        return <Component {...restProps as T}/>;
    }

    const ConnectedAuthRedirectComponent = connect(mapStateToProps, {})(RedirectComponent);

    return ConnectedAuthRedirectComponent;
};