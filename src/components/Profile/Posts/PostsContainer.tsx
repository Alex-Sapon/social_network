import {Posts} from './Posts';
import {AppStateType} from '../../../redux/redux-store';
import {addPost, updatePost} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';

const PostsContainer = () => {

    return <Posts />;
}

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPost: state.profilePage.newPost,
    }
};

export default connect(mapStateToProps, {addPost, updatePost})(PostsContainer);
