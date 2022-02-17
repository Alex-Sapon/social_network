import React, {FC} from 'react';
import styles from './Post.module.css';
import Rating from '../Rating/Rating';

interface PostPropsType {
    message: string;
    num: number;
    likesCount: number;
}

const Post: FC<PostPropsType> = ({message, num, likesCount}) => {
    return (
        <div>
            <h3>Post № {num}</h3>
            <p>{message}</p>
            <Rating stars={likesCount}/>
        </div>
    )
}

export default Post;