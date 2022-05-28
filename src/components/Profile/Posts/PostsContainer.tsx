import {Posts} from './Posts';
import {AppStateType} from '../../../redux/redux-store';
import {addPost, PostType} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';

type MapStateToPropsType = {
    posts: Array<PostType>
}
type MapDispatchToPropsType = {
    addPost: (post: string) => void
}

type PostsContainer = MapStateToPropsType & MapDispatchToPropsType;

const PostsContainer = (props: PostsContainer) => {

    return <Posts {...props}/>
}

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

export default connect(mapStateToProps, {addPost})(PostsContainer);
