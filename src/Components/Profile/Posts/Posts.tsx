import React, {FC, PropsWithChildren} from 'react';
import Post from './Post/Post';

const Posts: FC = (props) => {
    return (
        <div>
            <div>
                <h3>My posts</h3>
            </div>
            {props.posts.map(post => <Post key={post.id} num={post.id} message={post.message} likesCount={post.likesCount}/>)}
        </div>
    )
}

export default Posts;