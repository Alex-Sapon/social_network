import React, {FC, useEffect} from 'react';
import {Profile} from './Profile';
import {useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfile, ProfileType} from '../../redux/profile-reducer';
import {RootStateType} from '../../redux/redux-store';

export const ProfileContainer: FC = () => {
    const dispatch = useDispatch();
    const profile = useSelector<RootStateType, ProfileType>(state => state.profilePage.profile);

    const params = useParams<'id'>();
    const userID = params.id || '2';

    useEffect(() => {
        dispatch(getUserProfile(userID));
    }, [getUserProfile, userID]);

    return <Profile profile={profile}/>
};








// class ProfileContainer extends React.Component<ProfileContainerType> {
//     componentDidMount() {
//         axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
//             this.props.setProfile(response.data)
//         })
//     }

//     render() {
//         return <Profile {...this.props}/>
//     }
// }

// const mapStateToProps = (state: RootStateType) => ({
//     profile: state.profilePage.profile
// })

// export default connect(mapStateToProps, {setProfile})(ProfileContainer);


// import {NavigateFunction, Params, useLocation, useNavigate, useParams,} from "react-router-dom";
// import React, {ComponentType} from "react";
//
// export function withRouter<T>(Component: ComponentType<T>) {
//     function ComponentWithRouterProp(props: T & WithRouterType) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         return (
//             <Component
//                 {...props}
//                 router={{ location, navigate, params }}
//             />
//         );
//     }
//     return ComponentWithRouterProp;
// }
//
// type WithRouterType = Location & NavigateFunction & Readonly<Params<string>>;


// function ProfileRequest(props: ProfilePropsType) {
//     let {userId} = useParams<'userId'>()
//
//     return (
//         <Profile
//             {...props}
//         />
//     )
// }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { setUserProfile } from '../../../redux/profileReducer';
// import Profile from './Profile';
//
// const ProfileContainer = () => {
//
//     const [error, setError] = useState('');
//     const dispatch = useDispatch();
//     const profile = useSelector(state => state.profilePage.selectedProfile);
//     const params = useParams();
//
//     useEffect(() => {
//         setError('');
//
//         if (params.userId) {
//             axios
//                 .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
//                 .then(response => { dispatch(setUserProfile(response.data)) })
//                 .catch(error => {
//                     if (error.response.status === 400) {
//                         setError(`User with id: [${params.userId}] not found`);
//                     } else {
//                         setError(`${error}`);
//                     }
//                 });
//         }
//     }, [userId, dispatch])
//
//
//
//     return (
//         <>
//             {error
//                 ? <div>{error}</div>
//                 : <Profile profile={profile} />
//             }
//         </>
//     )
// }


// export default ProfileContainer;