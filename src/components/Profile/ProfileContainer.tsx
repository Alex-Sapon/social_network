import React, {useEffect} from 'react';
import {Profile} from './Profile'
import axios from 'axios';
import {connect} from 'react-redux';
import {ProfileType, setProfile} from '../../redux/profile-reducer'
import {RootStateType} from '../../redux/redux-store';
import {useParams} from 'react-router';

export type ProfileContainerType = {
    setProfile: (profile: ProfileType) => void
    profile: ProfileType
}

const ProfileContainer = (props: ProfileContainerType) => {
    const params = useParams<'userId'>()
    const userId = params.userId === ':userId' ? 2 : params.userId

    useEffect(() => {
        axios.get<ProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                props.setProfile(response.data)
            })
            .catch(error => {
                error.response.status === 400
                    ? console.log(`User with ID ${userId} not found!`)
                    : console.log(error)
            })
    }, [userId])

    return <Profile {...props}/>
}

const mapStateToProps = (state: RootStateType) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setProfile})(ProfileContainer);









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