import {Posts} from './Posts';
import {AppStateType} from '../../../redux/redux-store';
import {addPost, PostType, updatePost} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';
import {FC} from 'react';

type MapStateToPropsType = {
    posts: Array<PostType>
    newPost: string
};
type MapDispatchToPropsType = {
    addPost: () => void
    updatePost: (text: string) => void
};

type PostsContainer = MapStateToPropsType & MapDispatchToPropsType;

const PostsContainer: FC<PostsContainer> = props => {

    return <Posts {...props}/>;
};

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPost: state.profilePage.newPost,
    }
};

export default connect(mapStateToProps, {addPost, updatePost})(PostsContainer);
