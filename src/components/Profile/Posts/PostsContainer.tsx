import {Posts} from './Posts';
import {RootStateType} from '../../../redux/redux-store';
import {addPost, updatePost} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';

const mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profilePage.posts,
        newPost: state.profilePage.newPost
    }
}

export default connect(mapStateToProps, {addPost, updatePost})(Posts)
