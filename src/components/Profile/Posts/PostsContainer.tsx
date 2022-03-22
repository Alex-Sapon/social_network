import React, {Dispatch} from 'react';
import Posts from './Posts';

import {RootDispatchProps, RootStateProps} from '../../../redux/redux-store';
import {addPostActionCreator, updatePostChangeActionCreator} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';

const mapStateToProps = (state: RootStateProps) => {
    return {
        posts: state.profilePage.posts,
        newPost: state.profilePage.newPost
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootDispatchProps>) => {
    return {
        addPost: () => dispatch(addPostActionCreator()),
        updatePost: (text: string) => dispatch(updatePostChangeActionCreator(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
