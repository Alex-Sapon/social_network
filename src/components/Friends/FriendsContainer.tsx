import React from 'react';
import {RootStateProps} from '../../redux/redux-store';
import {connect} from 'react-redux';
import Friends from './Friends';

const mapStateToProps = (state: RootStateProps) => {
    return {
        users: state.messagesPage.users
    }
}

const FriendsContainer = connect(mapStateToProps, null)(Friends)

export default FriendsContainer;