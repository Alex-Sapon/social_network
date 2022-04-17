import React from 'react';
import {Profile} from './Profile'
import axios from 'axios';
import {connect} from 'react-redux';
import {ProfileType, setProfile} from '../../redux/profile-reducer'
import {RootStateType} from '../../redux/redux-store';

export type ProfileContainerType = {
    setProfile: (profile: ProfileType) => void
    profile: ProfileType
}

class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            this.props.setProfile(response.data)
        })
    }

    render() {
        return <Profile {...this.props}/>
    }
}

const mapStateToProps = (state: RootStateType) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setProfile})(ProfileContainer);